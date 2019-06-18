import isNode from "./isValidNode";

describe("isNode", () => {
  describe("Leaves", () => {
    describe("Text leaves", () => {
      test("Text must be string", () => {
        expect(
          isNode({
            type: "terminal",
            text: undefined,
            href: "href"
          })
        ).toBe(false);
      });
      test("Href must be string", () => {
        expect(
          isNode({
            type: "terminal",
            text: "text",
            href: 10
          })
        ).toBe(false);
      });
      test("Href can be undefined", () => {
        expect(
          isNode({
            type: "terminal",
            text: "text",
            href: undefined
          })
        ).toBe(true);
      });
    });
    test("Terminal", () => {
      expect(
        isNode({
          type: "terminal",
          text: "text",
          href: "href"
        })
      ).toBe(true);
    });
    test("NonTerminal", () => {
      expect(
        isNode({
          type: "nonTerminal",
          text: "text",
          href: "href"
        })
      ).toBe(true);
    });
    test("Comment", () => {
      expect(
        isNode({
          type: "comment",
          text: "text",
          href: "href"
        })
      ).toBe(true);
    });
    test("Skip", () => {
      expect(
        isNode({
          type: "skip"
        })
      ).toBe(true);
    });
  });
  describe("Branches", () => {
    describe("Choice", () => {
      test("Children must be array", () => {
        expect(
          isNode({
            type: "choice",
            children: "not an array"
          })
        ).toBe(false);
      });
      test("Children must be valid nodes", () => {
        expect(
          isNode({
            type: "choice",
            children: ["not a node"]
          })
        ).toBe(false);
      });
      test("Default must be number", () => {
        expect(
          isNode({
            type: "choice",
            default: "not a number",
            children: [{ type: "terminal", text: "test" }]
          })
        ).toBe(false);
      });
      test("Default must be in bounds", () => {
        expect(
          isNode({
            type: "choice",
            default: 2,
            children: [{ type: "terminal", text: "test" }]
          })
        ).toBe(false);
      });
      test("Default can be undefined", () => {
        expect(
          isNode({
            type: "choice",
            default: undefined,
            children: [{ type: "terminal", text: "test" }]
          })
        ).toBe(true);
      });
    });
    describe("Optional", () => {
      describe("Single child", () => {
        test("Child must be defined", () => {
          expect(
            isNode({
              type: "optional",
              skip: false,
              child: undefined
            })
          ).toBe(false);
        });
        test("Child must be node", () => {
          expect(
            isNode({
              type: "optional",
              skip: false,
              child: "not a node"
            })
          ).toBe(false);
        });
        test("Skip must be boolean", () => {
          expect(
            isNode({
              type: "optional",
              skip: "not a boolean",
              child: { type: "terminal", text: "test" }
            })
          ).toBe(false);
        });
      });
      describe("Sequenced children", () => {
        test("Children must be array", () => {
          expect(
            isNode({
              type: "optional",
              children: "not an array"
            })
          ).toBe(false);
        });
        test("Children must be valid nodes", () => {
          expect(
            isNode({
              type: "optional",
              skip: "not a boolean",
              children: ["not a node"]
            })
          ).toBe(false);
        });
      });
    });
    describe("Multiple", () => {
      describe("Single child", () => {
        test("Child must be defined", () => {
          expect(
            isNode({
              type: "multiple",
              child: undefined
            })
          ).toBe(false);
        });
        test("Child must be node", () => {
          expect(
            isNode({
              type: "multiple",
              child: "not a node"
            })
          ).toBe(false);
        });
      });
      describe("Sequenced children", () => {
        test("Children must be array", () => {
          expect(
            isNode({
              type: "multiple",
              children: "not an array"
            })
          ).toBe(false);
        });
        test("Children must be valid nodes", () => {
          expect(
            isNode({
              type: "multiple",
              children: ["not a node"]
            })
          ).toBe(false);
        });
      });
      describe("node.skip", () => {
        it("Must be boolean, if repeat is defined", () => {
          expect(
            isNode({
              type: "multiple",
              repeat: true,
              skip: undefined,
              child: { type: "terminal", text: "test" }
            })
          ).toBe(false);
        });
        it("Must be boolean, if optional is true", () => {
          expect(
            isNode({
              type: "multiple",
              optional: true,
              skip: undefined,
              child: { type: "terminal", text: "test" }
            })
          ).toBe(false);
        });
      });
      it("Should return true, if valid", () => {
        expect(
          isNode({
            type: "multiple",
            optional: false,
            child: { type: "terminal", text: "test" }
          })
        ).toBe(true);
      });
    });
  });
  test("Invalid type", () => {
    expect(isNode({ type: "not a node" })).toBe(false);
  });
});
