// Import Third-party Dependencies
import * as meriyah from "meriyah";

// Import Internal Dependencies
import { SourceParser } from "./SourceParser.js";

// CONSTANTS
const kParsingOptions = {
  next: true,
  loc: true,
  raw: true,
  jsx: true
};

export class JsSourceParser extends SourceParser {
  /**
   * @param {object} options
   * @param {boolean} options.isEcmaScriptModule
   */
  parse(str, options = {}) {
    const {
      isEcmaScriptModule,
      removeHTMLComments
    } = options;

    const source = this.prepareSource(str, { removeHTMLComments });

    try {
      return meriyah.parseScript(
        source,
        {
          ...kParsingOptions,
          module: isEcmaScriptModule,
          globalReturn: !isEcmaScriptModule
        }
      );
    }
    catch (error) {
      const isIllegalReturn = error.description.includes("Illegal return statement");

      if (error.name === "SyntaxError" && (
        error.description.includes("The import keyword") ||
        error.description.includes("The export keyword") ||
        isIllegalReturn
      )) {
        return meriyah.parseScript(
          source,
          {
            ...kParsingOptions,
            module: true,
            globalReturn: isIllegalReturn
          }
        );
      }

      throw error;
    }
  }
}

