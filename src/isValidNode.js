function isBranch(node) {
  switch (node.type) {
    case "choice":
      return Array.isArray(node.children) &&
        node.children.every(child => isNode(child)) &&
        node.default
        ? typeof node.default === "number" &&
            node.default < node.children.length - 1
        : true;
    case "optional":
      return (
        (node.children
          ? Array.isArray(node.children) &&
            node.children.every(child => isNode(child))
          : node.child && isNode(node.child)) && typeof node.skip === "boolean"
      );
    case "multiple":
      return (node.children
        ? Array.isArray(node.children) &&
          node.children.every(child => isNode(child))
        : node.child && isNode(node.child)) &&
        (node.repeat !== undefined ? typeof node.skip === "boolean" : true) &&
        typeof node.optional === "boolean" &&
        node.optional
        ? typeof node.skip === "boolean"
        : true;
    default:
      return false;
  }
}

function isTextLeaf(node) {
  return (
    typeof node.text === "string" &&
    (typeof node.href === "string" || !node.href)
  );
}

function isLeaf(node) {
  switch (node.type) {
    case "terminal":
      return isTextLeaf(node);
    case "nonTerminal":
      return isTextLeaf(node);
    case "comment":
      return isTextLeaf(node);
    case "skip":
      return true;
    default:
      return false;
  }
}

function isNode(node) {
  return isBranch(node) || isLeaf(node);
}

export default isNode;
