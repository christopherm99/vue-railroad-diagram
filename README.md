# Vue Railroad Diagram

[![CC BY 4.0](https://forthebadge.com/images/badges/cc-by.svg)](https://creativecommons.org/licenses/by/4.0/legalcode)
[![Made With JavaScript](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

[![Build status](https://img.shields.io/travis/christopherm99/vue-railroad-diagram.svg?style=for-the-badge)](https://travis-ci.org/christopherm99/vue-railroad-diagram)
[![Coverage status](https://img.shields.io/coveralls/github/christopherm99/vue-railroad-diagram.svg?style=for-the-badge)](https://coveralls.io/github/christopherm99/vue-railroad-diagram)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/christopherm99/vue-railroad-diagram.svg?style=for-the-badge)](https://github.com/christopherm99/vue-railroad-diagram/network/alerts)
![Dependency status](https://img.shields.io/david/christopherm99/vue-railroad-diagram.svg?style=for-the-badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)

[![NPM](https://nodei.co/npm/vue-railroad-diagram.png?compact=true)](https://www.npmjs.com/package/vue-railroad-diagram)

VueRailroadDiagram is a Vue.js component, powered by [tabatkins' railroad diagrams js library](https://github.com/tabatkins/railroad-diagrams.git), creating SVG syntax diagrams from JSON grammars.

## Installation
Typically, installing vue-railroad-diagram via `npm i vue-railroad-diagram` should work for most Vue.js systems.

However, this library is also available from unpkg at `https://unpkg.com/vue-railroad-diagram`. 

For those needing an es module format, this too is available (it should be automatically imported by rollup or webpack, but is available at `dist/vue-railroad-diagram.esm.js`). Please note that this is produced by the build script (`build:es`), which will be available via npm, a la Travis CI, but not from GitHub.

Finally, the single file component (SFC), is available at `src/railroad-diagram.vue`. Please use `import MyComponent from 'vue-railroad-diagram/sfc'` if you would prefer the SFC.

## Usage
Overall, vue-railroad-diagram is a relatively simple component, using two slots to draw the desired diagram.
### Example
The following is an example of a JSON object described by a railroad diagram: 

```vue
<template>
  ...
    <!-- Note that <vue-railroad-diagram /> also works -->
    <VueRailroadDiagram :options="diagramOpts" :grammar="grammar" />
  ...
</template>

<script>
import VueRailroadDiagram from "vue-railroad-diagram";
...
export default {
  ...
  data() {
    return {
      ...
      diagramOpts: {
        isStack: true,
        isComplex: true
      },
      grammar: [
        { type: "terminal", text: "{" },
        {
          type: "multiple",
          optional: true,
          repeat: ",",
          skip: false,
          children: [
            { type: "nonTerminal", text: "string" },
            { type: "terminal", text: ":" },
            { type: "nonTerminal", text: "value" }
          ]
        },
        { type: "terminal", text: "}" }
      ],
      ...
    }
  },
  ...
  components: {
    ...
    VueRailroadDiagram
    ...
  },
  ...
}
</script>
```

### Slots
Of the two slots are `options` and `grammar`

#### options
The options slot is an optional slot, defaulting to the following:
```js
{
  isStack: true,
  isComplex: true
}
```
`options` is an object which consists of two booleans, `isStack` and `isComplex`, `isStack` describing whether the diagram should be rendered as a vertical stack or horizontal sequency, and `isComplex` describing whether the diagram has "Complex" starts and ends or not.

#### grammar
The grammar is a non-optional slot. This is a sample, describing a JSON object:
```js
[
  { type: "terminal", text: "{" },
  {
    type: "multiple",
    optional: true,
    repeat: ",",
    skip: false,
    children: [
      { type: "nonTerminal", text: "string" },
      { type: "terminal", text: ":" },
      { type: "nonTerminal", text: "value" }
    ]
  },
  { type: "terminal", text: "}" }
]
```
`grammar` is an array which describes each step of the railroad diagram. Steps consist of a type portion (`type`), data portion (eg. `text`, `skip`, etc.), and a a child/children portion (either `child` or `children` - N/A if step is a leaf). 

## Development

This component still has missing features. Below is todo list for what needs to be added. However, to preview you changes locally, `@vue/cli-service-global` must be installed globally (`npm install -g @vue/cli-service-global` or `yarn global add @vue/cli-service-global`). After installing this, `vue serve ./dev/tester.vue` can be run. 

### Todo
- [ ] Fix hrefs on the text leaf elements (`terminal`, `nonTerminal`, & `comment`)
- [X] Add tests (and **proper** quick development system)
- [X] Make `grammar` a required prop
- [ ] Add more rigorous documentation
- [ ] Allow for stack to be used in any container
- [ ] Add support for `MultipleChoice()` and `HorizontalChoice()` (as part of `choice`)
- [ ] Add `Diagram()` options:
  - [ ] `VERTICAL_SEPARATION`
  - [ ] `ARC_RADIUS`
  - [ ] `DIAGRAM_CLASS`
  - [ ] `STROKE_ODD_PIXEL_LENGTH`
  - [ ] `INTERNAL_ALIGNMENT`
- [ ] Add custom CSS options (ie. completely customized or just selected options)

### Testing and Coverage

When contributing, please, at the very least, ensure that the preexisting tests still pass, using Jest, the test runner.

Running the provided test script (do not run `npm test`, as it is designed to run on CI):
```bash
npm run test:watch # This both watches all files and generates test coverage

# Optionally run this in a second terminal (for coverage preview) 
cd coverage/lcov-report
npx http-server # Or your favorite auto-refreshing server
```

Running a global instance of Jest (discouraged):
```bash
npm i -g jest # Installs jest
jest # Runs jest
```
### Committing

VueRailroadDiagram is [commitizen friendly](http://commitizen.github.io/cz-cli/), making commits as simple as running `npm run commit` and following the prompts. However, `git commit -m "..."` is still acceptable.
