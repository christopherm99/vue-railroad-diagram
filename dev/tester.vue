<template>
  <VueRailroadDiagram :options="options" :grammar="grammar" />
</template>
<script>
import VueRailroadDiagram from "../src/railroad-diagram";

export default {
  data() {
    return {
      options: {
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
      ]
    };
  },
  components: {
    VueRailroadDiagram
  }
};
</script>
