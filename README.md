# js-x-ray
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/js-x-ray/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fraxken/js-x-ray/commit-activity)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/fraxken/js-x-ray/blob/master/LICENSE)
![dep](https://img.shields.io/david/fraxken/js-x-ray)
![size](https://img.shields.io/bundlephobia/min/js-x-ray)

JavaScript AST analysis. This package has been created to export the [Node-Secure](https://github.com/ES-Community/nsecure) AST Analysis to make it easier to use and evolve the code over time.

The goal is to quickly identify dangerous code and patterns for developers and Security researchers.

> Note: I have no particular background in security. I am more and more interested and passionate about static code analysis. But I would be particularly happy to know that my work can make a difference.

## Features
- Retrieve required dependencies and files.
- Detect unsafe RegEx.
- Get warnings when the AST Analysis as a problem or when not able to follow a statement.
- Highlight common attack patterns and API usages.
- Capable to follow the usage of globals.

## Goals
The goal of the project is to be able to detect any suspicious JavaScript code. We are talking about suspicious code that has been maliciously added or injected.

Most of the time hackers will try to hide the code as much as possible so that it is not easily found/understood... So the lib's job is to found patterns and habits that allow us to detect these malicious codes.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i js-x-ray
# or
$ yarn add js-x-ray
```

## Usage example
Create a local `.js` file with the following content:
```js
try  {
    require("http");
}
catch (err) {
    // do nothing
}
const lib = "crypto";
require(lib);
require("util");
require(Buffer.from("6673", "hex").toString());
```

Then use `js-x-ray` to run an analysis of the JavaScript code:
```js
const { runASTAnalysis } = require("js-x-ray");
const { readFileSync } = require("fs");

const str = readFileSync("./file.js", "utf-8");
const { warnings, dependencies } = runASTAnalysis(str);

const dependenciesName = [...dependencies];
const inTryDeps = [...dependencies.getDependenciesInTryStatement()];

console.log(dependenciesName);
console.log(inTryDeps);
console.log(warnings);
```

The analysis will return: `http` (in try), `crypto`, `util` and `fs`.

## Warnings Legends

This section describe all the possible warnings returned by JSXRay.

| name | description |
| --- | --- |
| ast-error | An error occured when parsing the JavaScript code with meriyah. It mean that the conversion from string to AST as failed. |
| unsafe-import | Unable to follow an import (require, require.resolve) statement/expr. |
| unsafe-regex | A RegEx as been detected as unsafe and may be used for a ReDOS Attack |
| unsafe-stmt | Usage of eval or Function("") |
| hexa-value | An hex value has been detected in a Literal |
| short-ids | This mean that all identifiers has an average length below 1.5. Only possible if the file contains more than 5 identifiers. |
| suspicious-string | This mean that the suspicious score of all Literal is bigger than 3 |

## API

### runASTAnalysis(str: string, options?: RuntimeOptions) -> Report

```ts
interface RuntimeOptions {
    module?: boolean;
    isMinified?: boolean;
}
```

The method take a first argument which is the code you want to analyse. It will return a Report Object:

```ts
interface Report {
    dependencies: ASTDeps;
    warnings: Warning<BaseWarning>[];
    idsLengthAvg: number;
    stringScore: number;
    isOneLineRequire: boolean;
}
```

### generateWarning(kind?: string, options?: WarningOptions) -> any

```ts
interface WarningOptions {
    location: { start: number, end?: number }
    file?: string | null,
    value?: string | null
}
```

## License
MIT
