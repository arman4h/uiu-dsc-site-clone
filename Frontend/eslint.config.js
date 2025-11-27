//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: ['tailwind.config.js'],
  },
  ...tanstackConfig,
]
