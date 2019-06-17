import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import buble from "rollup-plugin-buble"; // Transpile/polyfill with reasonable browser support
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/entry.js", // Path relative to package.json
  output: {
    name: "VueRailroadDiagram",
    exports: "named",
    globals: { "railroad-diagrams": "railroadDiagrams" }
  },
  external: ["railroad-diagrams/railroad-diagrams.css", "railroad-diagrams"],
  plugins: [
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true // Explicitly convert template to render function
    }),
    buble(), // Transpile to ES5
    commonjs()
  ]
};
