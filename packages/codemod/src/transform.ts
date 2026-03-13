import jscodeshift from 'jscodeshift'

const SOURCE_PACKAGE = 'usehooks-ts'
const TARGET_PACKAGE = '@ts-hooks-kit/core'

const getStringValue = (node: unknown): string | null => {
  if (node && typeof node === 'object' && 'type' in node) {
    if (node.type === 'Literal' && 'value' in node && typeof node.value === 'string') {
      return node.value
    }
    if (node.type === 'StringLiteral' && 'value' in node && typeof node.value === 'string') {
      return node.value
    }
  }

  return null
}

export type TransformResult = {
  code: string
  changed: boolean
  rewrites: number
}

export const transformSource = (source: string): TransformResult => {
  const j = jscodeshift.withParser('tsx')
  const root = j(source)

  let rewrites = 0

  root.find(j.ImportDeclaration).forEach((path: any) => {
    if (path.node.source.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root.find(j.ExportNamedDeclaration).forEach((path: any) => {
    if (path.node.source?.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root.find(j.ExportAllDeclaration).forEach((path: any) => {
    if (path.node.source?.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root
    .find(j.CallExpression)
    .filter((path: any) => {
      if (path.node.callee.type !== 'Identifier' || path.node.callee.name !== 'require') {
        return false
      }

      const [firstArg] = path.node.arguments

      return getStringValue(firstArg) === SOURCE_PACKAGE
    })
    .forEach((path: any) => {
      const [firstArg] = path.node.arguments
      if (firstArg !== undefined && typeof firstArg === 'object' && 'type' in firstArg) {
        if (firstArg.type === 'Literal' || firstArg.type === 'StringLiteral') {
          firstArg.value = TARGET_PACKAGE
          rewrites += 1
        }
      }
    })

  if (rewrites === 0) {
    return {
      code: source,
      changed: false,
      rewrites: 0,
    }
  }

  return {
    code: root.toSource({ quote: 'single' }),
    changed: true,
    rewrites,
  }
}
