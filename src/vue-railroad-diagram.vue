<template>
  <div class="vue-railroad-diagram">
    <p>
      The counter is set to <b>{{ counter }}</b
      >.
    </p>
    <button @click="counter += 1">Click +1</button>
    <button @click="counter -= 1">Click -1</button>
    <button @click="counter = initCounter">Reset</button>
  </div>
</template>

<script>
import {
  Diagram,
  ComplexDiagram,
  Sequence,
  Choice,
  Optional,
  OneOrMore,
  ZeroOrMore,
  Terminal,
  NonTerminal,
  Comment,
  Skip
} from "railroad-diagrams";
import isValidNode from "./isValidNode";

export default {
  name: "VueRailroadDiagram", // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5
    };
  },
  created() {
    console.log(Diagram(Terminal("+"), NonTerminal("Number")).toString());
  },
  props: {
    grammar: {
      type: Array,
      validator(value) {
        return value.every(step => {
          isValidNode(step);
        });
      }
    },
    options: {
      type: Object,
      default: function() {
        return {
          isStack: false,
          isComplex: false
        };
      },
      validator(value) {
        return (value.isStack !== undefined
          ? typeof value.isStack === "boolean"
          : true) && value.isComplex !== undefined
          ? typeof value.isComplex === "boolean"
          : true;
      },
      required: false
    }
  }
};
</script>

<style scoped>
.vue-railroad-diagram {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.vue-railroad-diagram p {
  margin: 0 0 1em;
}
</style>
