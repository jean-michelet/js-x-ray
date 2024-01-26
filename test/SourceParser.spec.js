// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { SourceParser } from "../src/SourceParser.js";

describe("SourceParser", () => {
  describe("prepareSource", () => {
    it("should throw a TypeError if source is not a string", () => {
      assert.throws(
        () => new SourceParser().prepareSource(10),
        { message: "source must be a string" }
      );
    });

    it("should remove shebang at the start of the file", () => {
      const source = "#!/usr/bin/env node\nconst hello = \"world\";";
      const preparedSource = new SourceParser().prepareSource(source);

      assert.strictEqual(
        preparedSource,
        "const hello = \"world\";"
      );
    });

    it("should not remove shebang if not at the start (that's an illegal code)", () => {
      const source = "const hello = \"world\";\n#!/usr/bin/env node";
      const preparedSource = new SourceParser().prepareSource(source);

      assert.strictEqual(
        preparedSource,
        source
      );
    });

    it("should remove singleline HTML comment from source code when removeHTMLComments is enabled", () => {
      const preparedSource = new SourceParser().prepareSource("<!-- const yo = 5; -->", {
        removeHTMLComments: true
      });

      assert.strictEqual(preparedSource, "");
    });

    it("should remove multiline HTML comment from source code when removeHTMLComments is enabled", () => {
      const preparedSource = new SourceParser().prepareSource(`
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
      const preparedSource = new SourceParser().prepareSource(
        "<!-- const yo = 5; -->\nconst yo = 'foo'\n<!-- const yo = 5; -->", {
          removeHTMLComments: true
        });

      assert.strictEqual(preparedSource, "\nconst yo = 'foo'\n");
    });
  });
});
