export function toSlug(hookName) {
  return hookName.replace(/^use/, 'use-').replace(/[A-Z]/g, c => `-${c.toLowerCase()}`).replace('--', '-')
}

export function parseExportedHooks(indexSource) {
  const lines = indexSource.split('\n')
  const hooks = []
  for (const line of lines) {
    const match = line.match(/export \* from '\.\/(use[A-Za-z0-9]+)'/)
    if (match) hooks.push(match[1])
  }
  return hooks
}

export function extractJsDocSummary(source, hookName) {
  const exportPatterns = [
    `export function ${hookName}`,
    `export const ${hookName}`,
  ]
  const exportIndex = exportPatterns
    .map(pattern => source.indexOf(pattern))
    .find(index => index >= 0)
  if (exportIndex === undefined) return ''

  const beforeExport = source.slice(0, exportIndex)
  const commentEnd = beforeExport.lastIndexOf('*/')
  if (commentEnd < 0) return ''

  const betweenCommentAndExport = beforeExport.slice(commentEnd + 2)
  if (betweenCommentAndExport.trim().length > 0) return ''

  const commentStart = beforeExport.lastIndexOf('/**', commentEnd)
  if (commentStart < 0) return ''

  const commentBlock = beforeExport.slice(commentStart + 3, commentEnd)
  const lines = commentBlock
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())

  const summaryLines = []
  for (const line of lines) {
    if (!line) {
      if (summaryLines.length > 0) break
      continue
    }
    if (line.startsWith('@')) break
    summaryLines.push(line)
  }

  return summaryLines.join(' ').replace(/\s+/g, ' ').trim()
}

function commentPartsToText(parts) {
  if (!Array.isArray(parts)) return ''
  return parts
    .map(part => ('text' in part ? part.text : ''))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

function typeToText(typeNode) {
  if (!typeNode || typeof typeNode !== 'object') return 'unknown'

  switch (typeNode.type) {
    case 'intrinsic':
      return typeNode.name ?? 'unknown'
    case 'reference': {
      const name = typeNode.name ?? 'unknown'
      const args = Array.isArray(typeNode.typeArguments) ? typeNode.typeArguments.map(typeToText) : []
      return args.length > 0 ? `${name}<${args.join(', ')}>` : name
    }
    case 'array':
      return `${typeToText(typeNode.elementType)}[]`
    case 'union':
      return Array.isArray(typeNode.types) ? typeNode.types.map(typeToText).join(' | ') : 'unknown'
    case 'literal':
      return JSON.stringify(typeNode.value)
    case 'reflection': {
      const signature = typeNode.declaration?.signatures?.[0]
      if (!signature) return 'object'
      const params = (signature.parameters ?? [])
        .map(parameter => `${parameter.name}: ${typeToText(parameter.type)}`)
        .join(', ')
      return `(${params}) => ${typeToText(signature.type)}`
    }
    default:
      return 'unknown'
  }
}

function getHookModule(typedocJson, hookName) {
  if (!typedocJson || !Array.isArray(typedocJson.children)) return null
  return (
    typedocJson.children.find(child => child.name === `${hookName}/${hookName}`) ??
    typedocJson.children.find(child => typeof child.name === 'string' && child.name.startsWith(`${hookName}/`)) ??
    null
  )
}

export function getHookTypedocData(typedocJson, hookName) {
  const hookModule = getHookModule(typedocJson, hookName)
  if (!hookModule) {
    return {
      summary: '',
      apiSignature: `function ${hookName}(...args): unknown`,
      returnsDescription: '',
      typeAliases: [],
    }
  }

  const groups = Array.isArray(hookModule.groups) ? hookModule.groups : []
  const children = Array.isArray(hookModule.children) ? hookModule.children : []
  const functionGroup = groups.find(group => group.title === 'Functions')
  const functionIds = Array.isArray(functionGroup?.children) ? functionGroup.children : []

  const hookFunction =
    children.find(child => functionIds.includes(child.id) && child.name === hookName) ??
    children.find(child => child.name === hookName && Array.isArray(child.signatures)) ??
    null

  const signature = hookFunction?.signatures?.[0]
  const signatureParams = (signature?.parameters ?? [])
    .map(parameter => {
      const optionalSuffix = parameter.flags?.isOptional ? '?' : ''
      return `${parameter.name}${optionalSuffix}: ${typeToText(parameter.type)}`
    })
    .join(', ')

  const apiSignature = signature
    ? `function ${signature.name}(${signatureParams}): ${typeToText(signature.type)}`
    : `function ${hookName}(...args): unknown`

  const returnsTag = signature?.comment?.blockTags?.find(blockTag => blockTag.tag === '@returns')
  const returnsDescription = commentPartsToText(returnsTag?.content)
  const summary = commentPartsToText(signature?.comment?.summary)

  const typeAliasesGroup = groups.find(group => group.title === 'Type Aliases')
  const typeAliasIds = Array.isArray(typeAliasesGroup?.children) ? typeAliasesGroup.children : []
  const typeAliases = typeAliasIds
    .map(typeAliasId => children.find(child => child.id === typeAliasId))
    .filter(Boolean)
    .map(typeAlias => {
      const members = []
      const memberSources = typeAlias.children ?? typeAlias.type?.declaration?.children ?? []
      for (const member of memberSources) {
        members.push({
          name: member.name,
          type: typeToText(member.type),
          description: commentPartsToText(member.comment?.summary),
        })
      }
      return {
        name: typeAlias.name,
        summary: commentPartsToText(typeAlias.comment?.summary),
        members,
      }
    })

  const parameters = (signature?.parameters ?? []).map(parameter => ({
    name: parameter.name + (parameter.flags?.isOptional ? '?' : ''),
    type: typeToText(parameter.type),
    defaultValue: parameter.defaultValue ?? '-',
    description: commentPartsToText(parameter.comment?.summary),
  }))

  return {
    summary,
    apiSignature,
    returnsDescription,
    typeAliases,
    parameters,
  }
}

function buildDefaultUsage(hookName) {
  return `import { ${hookName} } from '@ts-hooks-kit/core'

function Example() {
  const result = ${hookName}()
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}`
}

export function composeHookMarkdown({
  hookName,
  summary,
  introMarkdown,
  demoSource,
  hookSource,
  typedocData,
}) {
  const intro = introMarkdown?.trim() || summary || `${hookName} hook for React apps.`
  const usageCode = demoSource?.trim() || buildDefaultUsage(hookName)
  const hookCode = hookSource?.trim() || `export function ${hookName}() {}`
  const apiSignature = typedocData?.apiSignature || `function ${hookName}(...args): unknown`
  const apiSummary = typedocData?.summary || ''
  const parameters = Array.isArray(typedocData?.parameters) ? typedocData.parameters : []
  const returnsDescription = typedocData?.returnsDescription || 'No return description available yet.'
  const typeAliases = Array.isArray(typedocData?.typeAliases) ? typedocData.typeAliases : []

  const typeAliasesSection =
    typeAliases.length === 0
      ? ''
      : `## Type declaration

${typeAliases
  .map(typeAlias => {
    const summaryLine = typeAlias.summary ? `${typeAlias.summary}\n\n` : ''
    if (typeAlias.members.length > 0) {
      const table = `| Name | Type | Description |
| --- | --- | --- |
${typeAlias.members.map(m => `| \`${m.name}\` | \`${m.type}\` | ${m.description || '-'} |`).join('\n')}`
      return `### ${typeAlias.name}

${summaryLine}${table}`
    }
    return `### ${typeAlias.name}

${summaryLine}`
  })
  .join('\n\n')}`

  return `# ${hookName}

${intro}

## Usage

\`\`\`tsx
${usageCode}
\`\`\`

## API

\`\`\`ts
${apiSignature}
\`\`\`
${apiSummary ? `\n${apiSummary}\n` : ''}${parameters.length > 0 ? `
### Parameters

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
${parameters.map(p => `| \`${p.name}\` | \`${p.type}\` | \`${p.defaultValue}\` | ${p.description || '-'} |`).join('\n')}
` : ''}
## Returns

${returnsDescription}

${typeAliasesSection ? `${typeAliasesSection}

` : ''}## Hook

\`\`\`ts
${hookCode}
\`\`\`
`
}
