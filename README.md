# NanoI18n

**A minimal, yet flexible, type-safe I18N framework.**

---

[![license](https://img.shields.io/npm/l/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)](https://github.com/nanoi18n/nanoi18n-core/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@nanoi18n/core)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/@nanoi18n/core.svg?style=for-the-badge&labelColor=000000)

    EXPERIMENTAL: NanoI18n is currently in early development and we appreciate all constructive feedback.

NanoI18n is being built with the following goals in mind:

- **Lightweight** - No dependencies and minimal functionality.
- **Dev friendly** - Uses types (and soon lint rules) to catch issues during development.
- **Flexible** - You choose how to group your messages and when to load them.
- **Self-contained** - No macros or CLI tools to run or configure.

## When not to use NanoI18n?

- **Non TS code base** - The value of NanoI18n comes through when using types for validation.
- **Require localization of special values done by framework** - Most I18n frameworks support the ICU format which uses specially formatted messages in order to localize things like plurals, number formats, dates, etc. NanoI18n assumes that you will provide pre-formatted data to the parameterized messages.

## Next

We will be adding support for:

- **Plurals** - allows to choose a message based on a quantity associated with it.

## Usage

### Install

`yarn add @nanoi18n/core`

### Basic Usage

1. Create the file(s) containing the localized messages

   ```typescript
   // messages.en.ts
   export const messages = {
     'component.hi': () => 'hi!',
     'component.hi-with-name': ({ fullName }: { fullName: string }) =>
       `hi ${a}!`,
   }
   ```

   ```typescript
   // messages.es.ts
   export const messages = {
     'component.hi': () => '¡hola!',
     'component.hi-with-name': ({ fullName }: { fullName: string }) =>
       `¡hola = ${a}!`,
   }
   ```

2. Export the localization messages loader

   ```typescript
   // messages.ts
   import type { messages as enMessages } from './messages.en.js'
   import type { messages as esMessages } from './messages.es.js'
   import type { NanoI18nL10nImporters } from '@nanoi18n/core'
   import { loadMessages } from '@nanoi18n/core'

   // This can be exported here or defined globally if used in multiple places
   export enum Locale {
     EN = 'en',
     ES = 'es',
   }

   // `importers` is used to dynamically import the required locale

   // NOTE: Using the type as described here is important in order to get TS
   //  errors for missing keys or mismatched message types.
   const importers: NanoI18nL10nImporters<
     // Supported locales
     Locale,
     // Types of messages (ensure to include all messages)
     typeof enMessages & typeof esMessages
   > = {
     [Locale.EN]: async () => (await import('./messages.en.js')).messages,
     [Locale.ES]: async () => (await import('./messages.es.js')).messages,
   }

   export const getMessages = async (locales: Locale) => {
     const m = await loadMessages(locale, importers)

     return m
   }
   ```

3. Localize your project

   ```typescript
   // main.ts
   import { getMessages } from '/.messages.js'

   const doStuff = async () => {
     const m = await getLocalizer('es')

     console.log(m['hi']())
     // Output: ¡Hola!

     console.log(m['hi-with-name']({ name: 'Daniela' }))
     // Output: ¡Hola Daniela!
   }

   doStuff()
   ```
