#!/usr/bin/env node

import { cwd } from 'node:process'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { Command } from 'commander'
import { globby } from 'globby'
import jscodeshift from 'jscodeshift'

const SOURCE_PACKAGE = 'usehooks-ts'
const TARGET_PACKAGE = '@ts-hooks-kit/core'

const getStringValue = node => {
  if (!node || typeof node !== 'object' || !('type' in node)) {
    return null
  }

  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value
  }

  if (node.type === 'StringLiteral' && typeof node.value === 'string') {
    return node.value
  }

  return null
}

const transformSource = source => {
  const j = jscodeshift.withParser('tsx')
  const root = j(source)
  let rewrites = 0

  root.find(j.ImportDeclaration).forEach(path => {
    if (path.node.source.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root.find(j.ExportNamedDeclaration).forEach(path => {
    if (path.node.source?.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root.find(j.ExportAllDeclaration).forEach(path => {
    if (path.node.source?.value === SOURCE_PACKAGE) {
      path.node.source = j.literal(TARGET_PACKAGE)
      rewrites += 1
    }
  })

  root
    .find(j.CallExpression)
    .filter(path => {
      if (path.node.callee.type !== 'Identifier' || path.node.callee.name !== 'require') {
        return false
      }

      const [firstArg] = path.node.arguments
      return getStringValue(firstArg) === SOURCE_PACKAGE
    })
    .forEach(path => {
      const [firstArg] = path.node.arguments
      if (firstArg && typeof firstArg === 'object' && 'type' in firstArg) {
        if (firstArg.type === 'Literal' || firstArg.type === 'StringLiteral') {
          firstArg.value = TARGET_PACKAGE
          rewrites += 1
        }
      }
    })

  if (rewrites === 0) {
    return { code: source, changed: false, rewrites: 0 }
  }

  return {
    code: root.toSource({ quote: 'single' }),
    changed: true,
    rewrites,
  }
}

const runCodemod = async ({ target, pattern, dry }) => {
  const targetDir = resolve(cwd(), target)
  const files = await globby(pattern, {
    cwd: targetDir,
    absolute: true,
    gitignore: true,
  })

  let changedFiles = 0
  let rewrites = 0

  for (const filePath of files) {
    const current = await readFile(filePath, 'utf8')
    const result = transformSource(current)
    rewrites += result.rewrites

    if (!result.changed) {
      continue
    }

    changedFiles += 1
    if (!dry) {
      await writeFile(filePath, result.code, 'utf8')
    }
  }

  return {
    scannedFiles: files.length,
    changedFiles,
    rewrites,
  }
}

const program = new Command()

program
  .name('ts-hooks-kit-codemod')
  .description('Rewrite usehooks-ts imports to @ts-hooks-kit/core')
  .argument('[target]', 'target directory', '.')
  .option(
    '-p, --pattern <glob>',
    'file glob pattern',
    '**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
  )
  .option('--dry', 'show summary without writing files', false)
  .action(async (target, options) => {
    const summary = await runCodemod({ target, pattern: options.pattern, dry: options.dry })

    const mode = options.dry ? 'DRY RUN' : 'WRITE'
    console.log(
      `[${mode}] scanned=${summary.scannedFiles} changed=${summary.changedFiles} rewrites=${summary.rewrites}`,
    )
  })

program.parse()
