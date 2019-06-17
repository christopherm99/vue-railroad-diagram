# Vue Railroad Diagram
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
`options` is an object which consists of two booleans, `isStack` and `isComplex`, `isStack` describing whether the diagram should be renedered as a vertical stack or horizontal sequency, and `isComplex` describing whether the diagram has "Complex" starts and ends or not.

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
