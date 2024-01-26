import { tsParsingOptions } from "../src/TsSourceParser";

interface ParseOptions {
  /**
   * Prevents the parser from throwing an error if it receives an invalid AST from TypeScript.
   * This case only usually occurs when attempting to lint invalid code.
   */
  allowInvalidAST?: boolean;

  /**
   * create a top-level comments array containing all comments
   */
  comment?: boolean;

  /**
   * Whether deprecated AST properties should skip calling console.warn on accesses.
   */
  suppressDeprecatedPropertyWarnings?: boolean;

  /**
   * An array of modules to turn explicit debugging on for.
   * - 'typescript-eslint' is the same as setting the env var `DEBUG=typescript-eslint:*`
   * - 'eslint' is the same as setting the env var `DEBUG=eslint:*`
   * - 'typescript' is the same as setting `extendedDiagnostics: true` in your tsconfig compilerOptions
   *
   * For convenience, also supports a boolean:
   * - true === ['typescript-eslint']
   * - false === []
   */
  debugLevel?: boolean | ('typescript-eslint' | 'eslint' | 'typescript')[];

  /**
   * Cause the parser to error if it encounters an unknown AST node type (useful for testing).
   * This case only usually occurs when TypeScript releases new features.
   */
  errorOnUnknownASTType?: boolean;

  /**
   * Absolute (or relative to `cwd`) path to the file being parsed.
   */
  filePath?: string;

  /**
   * If you are using TypeScript version >=5.3 then this option can be used as a performance optimization.
   *
   * The valid values for this rule are:
   * - `'all'` - parse all JSDoc comments, always.
   * - `'none'` - parse no JSDoc comments, ever.
   * - `'type-info'` - parse just JSDoc comments that are required to provide correct type-info. TS will always parse JSDoc in non-TS files, but never in TS files.
   *
   * If you do not rely on JSDoc tags from the TypeScript AST, then you can safely set this to `'none'` to improve performance.
   */
  jsDocParsingMode?: JSDocParsingMode;

  /**
   * Enable parsing of JSX.
   * For more details, see https://www.typescriptlang.org/docs/handbook/jsx.html
   *
   * NOTE: this setting does not effect known file types (.js, .cjs, .mjs, .jsx, .ts, .mts, .cts, .tsx, .json) because the
   * TypeScript compiler has its own internal handling for known file extensions.
   *
   * For the exact behavior, see https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsecmafeaturesjsx
   */
  jsx?: boolean;

  /**
   * Controls whether the `loc` information to each node.
   * The `loc` property is an object which contains the exact line/column the node starts/ends on.
   * This is similar to the `range` property, except it is line/column relative.
   */
  loc?: boolean;

  /*
    * Allows overriding of function used for logging.
    * When value is `false`, no logging will occur.
    * When value is not provided, `console.log()` will be used.
    */
  loggerFn?: Function | false;

  /**
   * Controls whether the `range` property is included on AST nodes.
   * The `range` property is a [number, number] which indicates the start/end index of the node in the file contents.
   * This is similar to the `loc` property, except this is the absolute index.
   */
  range?: boolean;

  /**
   * Set to true to create a top-level array containing all tokens from the file.
   */
  tokens?: boolean;
}

declare function parse(
  code: string,
  options: ParseOptions = tsParsingOptions,
): TSESTree.Program;