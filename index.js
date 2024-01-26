// Import Internal Dependencies
import { warnings } from "./src/warnings.js";
import { JsSourceParser } from "./src/JsSourceParser.js";
import { AstAnalyser } from "./src/AstAnalyser.js";

export function runASTAnalysis(
  str,
  options = Object.create(null)
) {
  const {
    customParser = new JsSourceParser(),
    ...opts
  } = options;

  const analyser = new AstAnalyser(customParser);

  return analyser.analyse(str, opts);
}

export async function runASTAnalysisOnFile(
  pathToFile,
  options = {}
) {
  const {
    customParser = new JsSourceParser(),
    ...opts
  } = options;

  const analyser = new AstAnalyser(customParser);

  return analyser.analyseFile(pathToFile, opts);
}

export { warnings };
