import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { generateLocalesTemplate, getLocaleKeys, resolveLocaleKey } from '../../src/utils/locales'

const keys = getLocaleKeys(resolve(process.cwd(), 'src/runtime/locale'))

describe('locales template', () => {
  it.each([
    ['fr', 'fr'],
    ['pt-BR', 'pt_br'],
    ['en-US', 'en'],
    [{ code: 'en', language: 'en-GB' }, 'en_gb'],
    [{ code: 'zh-Hant', language: 'zh-TW' }, 'zh_tw'],
    ['xx', undefined]
  ])('resolves %j to %s', (locale, key) => {
    expect(resolveLocaleKey(locale, keys)).toBe(key)
  })

  it('imports only the configured locales', () => {
    const contents = generateLocalesTemplate(['en', { code: 'fr' }, { code: 'pt-BR', language: 'pt-BR' }, 'en-US', 'xx'], keys, '/locale')

    expect(contents).toMatchInlineSnapshot(`
      "import type { Locale, Messages } from '@nuxt/ui'
      import en from "/locale/en";
      import fr from "/locale/fr";
      import pt_br from "/locale/pt_br";
      export default {
        en: en,
        fr: fr,
        "pt-BR": pt_br,
        "en-US": en
      } as Record<string, Locale<Messages>>"
    `)
  })
})
