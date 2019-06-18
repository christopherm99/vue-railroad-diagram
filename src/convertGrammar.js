import {
  Diagram,
  ComplexDiagram,
  Sequence,
  Stack,
  Choice,
  Optional,
  OneOrMore,
  ZeroOrMore,
  Terminal,
  NonTerminal,
  Comment,
  Skip
} from "railroad-diagrams";

function parseNode(node) {
  switch (node.type) {
    case "terminal":
      return Terminal(node.text, node.href);
    case "nonTerminal":
      return NonTerminal(node.text, node.href);
    case "comment":
      return Comment(node.text, node.href);
    case "skip":
      return Skip();
    case "choice":
      return node.default !== undefined
        ? Choice(...node.children.map(child => parseNode(child)), node.default)
        : Choice(...node.children.map(child => parseNode(child)));
    case "optional":
      return node.children
        ? Optional(Sequence(...node.children.map(child => parseNode(child))))
        : Optional(parseNode(node.child));
    case "multiple":
      return node.optional
        ? node.skip
          ? node.children
            ? ZeroOrMore(
                Sequence(...node.children.map(child => parseNode(child))),
                node.repeat,
                "skip"
              )
            : ZeroOrMore(parseNode(node.child), node.repeat, "skip")
          : node.children
          ? node.repeat !== undefined
            ? ZeroOrMore(
                Sequence(...node.children.map(child => parseNode(child))),
                node.repeat
              )
            : ZeroOrMore(
                Sequence(...node.children.map(child => parseNode(child)))
              )
          : node.repeat !== undefined
          ? ZeroOrMore(parseNode(node.child), node.repeat)
          : ZeroOrMore(parseNode(node.child))
        : node.children
        ? node.repeat !== undefined
          ? OneOrMore(
              Sequence(...node.children.map(child => parseNode(child))),
              node.repeat
            )
          : OneOrMore(Sequence(...node.children.map(child => parseNode(child))))
        : node.repeat !== undefined
        ? OneOrMore(parseNode(node.child), node.repeat)
        : OneOrMore(parseNode(node.child));
    default:
      return "Uh oh";
  }
}

export default (grammar, options) => {
  options = options ? options : { isStack: false, isComplex: false };
  return options.isComplex
    ? options.isStack
      ? ComplexDiagram(Stack(...grammar.map(step => parseNode(step))))
      : ComplexDiagram(...grammar.map(step => parseNode(step)))
    : options.isStack
    ? Diagram(Stack(...grammar.map(step => parseNode(step))))
    : Diagram(...grammar.map(step => parseNode(step)));
};
