// Import Internal Dependencies
import { extractNode } from "../utils/index.js";

// CONSTANTS
const kIdExtractor = extractNode("Identifier");

function validateNode(node) {
  return [
    node.type === "ClassDeclaration"
  ];
}

function main(node, options) {
  const { sourceFile } = options;

  kIdExtractor(
    ({ name }) => sourceFile.identifiersName.push({ name, type: "class" }),
    [node.id, node.superClass]
  );
}

export default {
  name: "isClassDeclaration",
  validateNode,
  main,
  breakOnMatch: false
};
