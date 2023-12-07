# NanoI18n

**A minimal, yet flexible, type safe I18N framework.**

---

[![license](https://img.shields.io/npm/l/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)](https://github.com/nanoi18n/nanoi18n-core/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@nanoi18n/core)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)

    EXPERIMENTAL: NanoI18n is currently in early development and we appreciate all constructive feedback.

NanoI18n was built with the following principles in mind:

- **Lightweight** - NanoI18n does not include any dependencies and has minimal functionality making it extremely light.
- **Issues visible in editor** - Built on TypeScript to catch any issues as close to developer experience as possible.
- **Flexible** - You get to choose where to locate your localized messages and when to load them,
- **Self-contained** - Instead of using macros or CLI tools as part of the localization process, types (and eventually lint plugins) are used to ensure all strings are localized and the structure of the messages match across locales.

## Supported Functionality

- **Basic messages** - You select an id and a message
  ```typescript
  l('id')
  ```
- **Parameterized messages** - Pass some parameters to the localization function `l` and consume it as part of your string
  ```typescript
  l('id-with-params', { param: 'value' })
  ```

## When not to use NanoI18n?

- **Non TS/JS code base** - NanoI18n is built to work with TS/JS. While tooling could be built to tranform the TS messages files into some other format supported by other languages, it is beyond the scope of this project.
- **Project requires the framework to do the formatting** - Most I18n frameworks support the ICU format which use specially formatted messages in order to localize things like plurals, number formats, dates, etc. NanoI18n assumes that you will provide pre-formatted data to the parameterized messages.

## Next work

We will be adding support for:

- **Plurals** - allows to choose a message based on a quantity associated with it.

## Usage

### Install

`yarn add @nanoi18n/core`

### Basic Usage

1. Create your file(s) containing your localized messages

   ```typescript
   // messages.en.ts
   export const messages = {
     hi: 'hi!',
     'hi-with-name': ({ name }: Readonly<{ name: string }>): string =>
       `hi ${a}!`,
   }
   ```

   ```typescript
   // messages.es.ts
   export const messages = {
     hi: '¡hola!',
     'hi-with-name': ({ name }: Readonly<{ name: string }>): string =>
       `¡hola = ${a}!`,
   }
   ```

2. Export the localization `l` function generator

   ```typescript
   // messages.ts
   import type { messages as enMessages } from './messages.en.js'
   import type { messages as esMessages } from './messages.es.js'
   import type { NanoI18nL10nImporters } from '@nanoi18n/core'
   import { loadL10n } from '@nanoi18n/core'

   // `importers` is used to dynamically import the required locale

   // NOTE: Using the type as described here is important in order to get
   //  TS errors for missing keys, different message types or mismatched
   //  parameters.
   const importers: NanoI18nL10nImporters<
     // Supported localed (can be an enum)
     'en' | 'es',
     // Types of messages (ideally the base language used during development)
     typeof enMessages
   > = {
     ['en']: async () => (await import('./messages.en.js')).messages,
     ['es']: async () => (await import('./messages.es.js')).messages,
   }

   export const getLocalizer = async (locales: 'en' | 'es') => {
     const l = await loadL10n(locale, importers)

     return l
   }
   ```

3. Localize your project

   ```typescript
   // main.ts
   import { getLocalizer } from '/.messages.js'

   const doStuff = async () => {
     const l = await getLocalizer('es')

     console.log(l('hi'))
     // Output: ¡Hola!

     console.log(l('hi-with-name', { name: 'Daniela' }))
     // Output: ¡Hola Daniela!
   }

   doStuff()
   ```

### Runtime parameter check

In order to ensure that all parameters are defined at runtime you can use the `paramCheck` helper (imported as `pc` below for conciseness) in your messages files. The helper goes through the listed params to ensure they are not undefined.

Example:

```typescript
// messages.en.ts
import { paramCheck as pc } from '@nanoi18n/core'

export const messages = {
  'hi-whit-name': ({ name }) => pc([name], `Hi ${name}!`),
}
```
