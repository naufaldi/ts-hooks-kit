import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { globby } from 'globby'

import { transformSource } from './transform'

export type RunOptions = {
  cwd: string
  target: string
  pattern: string
  dry: boolean
}

export type RunSummary = {
  scannedFiles: number
  changedFiles: number
  rewrites: number
}

export const runCodemod = async (options: RunOptions): Promise<RunSummary> => {
  const targetDir = resolve(options.cwd, options.target)
  const files = await globby(options.pattern, {
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
    if (!options.dry) {
      await writeFile(filePath, result.code, 'utf8')
    }
  }

  return {
    scannedFiles: files.length,
    changedFiles,
    rewrites,
  }
}
