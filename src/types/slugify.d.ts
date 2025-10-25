declare module 'slugify' {
  interface Options {
    replacement?: string
    remove?: RegExp
    lower?: boolean
    strict?: boolean
    locale?: string
    trim?: boolean
  }

  function slugify(string: string, options?: Options | string): string
  function slugify(string: string, replacement?: string): string

  export = slugify
}
