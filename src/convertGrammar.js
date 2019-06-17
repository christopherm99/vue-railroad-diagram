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
      return node.default
        ? Choice(...node.children.map(child => parseNode(child)), node.default)
        : Choice(...node.children.map(child => parseNode(child)));
    case "optional":
      return node.children
        ? Optional(Sequence(...node.children.map(child => parseNode(child))))
        : Optional(parseNode(node.child));
    case "multiple":
      return node.optional
        ? node.skip
          ? ZeroOrMore(
              Sequence(...node.children.map(child => parseNode(child))),
              node.repeat,
              "skip"
            )
          : ZeroOrMore(
              Sequence(...node.children.map(child => parseNode(child))),
              node.repeat
            )
        : OneOrMore(
            Sequence(...node.children.map(child => parseNode(child))),
            node.repeat
          );
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
