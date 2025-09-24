declare module '@babel/register' {
  interface RegisterOptions {
    extensions?: string[];
    cache?: boolean;
    ignore?: Array<string | RegExp> | RegExp | ((filename: string) => boolean);
    only?: Array<string | RegExp> | RegExp | ((filename: string) => boolean);
  }

  export function register(options?: RegisterOptions): void;
  export default register;
}
