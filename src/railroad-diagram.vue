<template>
  <div class="vue-railroad-diagram" v-html="svg" />
</template>

<script>
import isValidNode from "./isValidNode";
import convert from "./convertGrammar";
import "railroad-diagrams/railroad-diagrams.css";

export default {
  name: "VueRailroadDiagram", // vue component name
  data() {
    return {
      svg: convert(this.grammar, this.options).toString()
    };
  },
  props: {
    grammar: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(step => isValidNode(step));
      }
    },
    options: {
      type: Object,
      default() {
        return {
          isStack: true,
          isComplex: true
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
/* @import "node_modules/railroad-diagrams/railroad-diagrams.css";
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
} */
</style>
