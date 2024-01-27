// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { AstAnalyser } from "../src/AstAnalyser.js";
import { JsSourceParser } from "../src/JsSourceParser.js";

describe("AstAnalyser", () => {
  describe("prepareSource", () => {
    it("should remove shebang at the start of the file", () => {
      const source = "#!/usr/bin/env node\nconst hello = \"world\";";
      const preparedSource = new AstAnalyser(new JsSourceParser()).prepareSource(source);

      assert.strictEqual(
        preparedSource,
        "const hello = \"world\";"
      );
    });

    it("should not remove shebang if not at the start (that's an illegal code)", () => {
      const source = "const hello = \"world\";\n#!/usr/bin/env node";
      const preparedSource = new AstAnalyser(new JsSourceParser()).prepareSource(source);

      assert.strictEqual(
        preparedSource,
        source
      );
    });

    it("should remove singleline HTML comment from source code when removeHTMLComments is enabled", () => {
      const preparedSource = new AstAnalyser(new JsSourceParser()).prepareSource("<!-- const yo = 5; -->", {
        removeHTMLComments: true
      });

      assert.strictEqual(preparedSource, "");
    });

    it("should remove multiline HTML comment from source code when removeHTMLComments is enabled", () => {
      const preparedSource = new AstAnalyser(new JsSourceParser()).prepareSource(`
      <!--
    // == fake comment == //
  
    const yo = 5;
    //-->
    `, {
        removeHTMLComments: true
      });

      assert.strictEqual(preparedSource.trim(), "");
    });

    it("should remove multiple HTML comments", () => {
      const preparedSource = new AstAnalyser(new JsSourceParser()).prepareSource(
        "<!-- const yo = 5; -->\nconst yo = 'foo'\n<!-- const yo = 5; -->", {
          removeHTMLComments: true
        });

      assert.strictEqual(preparedSource, "\nconst yo = 'foo'\n");
    });
  });
});
