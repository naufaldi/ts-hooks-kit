import * as hooks from './index'

describe('core index exports', () => {
  it('exports useList hook', () => {
    expect(hooks.useList).toBeDefined()
  })
})
