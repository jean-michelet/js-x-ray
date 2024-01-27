// Import Third-party Dependencies
import { parse } from "@typescript-eslint/typescript-estree";

// Import Internal Dependencies
import { SourceParser } from "./SourceParser.js";

// CONSTANTS
export const tsParsingOptions = {
  comment: false,
  filePath: "estree.ts",
  jsDocParsingMode: "all",
  jsx: false,
  loc: true,
  loggerFn: undefined,
  range: false,
  tokens: false
};

export class TsSourceParser extends SourceParser {
  /**
   * @param {object} options
   */
  parse(source, opts = {}) {
    const options = {
      ...tsParsingOptions,
      ...opts
    };

    return parse(source, options);
  }
}

