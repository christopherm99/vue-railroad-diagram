import convert from "./convertGrammar";
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

jest.mock("railroad-diagrams");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Convert", () => {
  describe("ComplexDiagram", () => {
    it("Should be called, if isComplex", () => {
      convert([], { isComplex: true });
      expect(ComplexDiagram).toBeCalled();
    });
    it("Should not call Stack, by default", () => {
      convert([], { isComplex: true });
      expect(Stack).not.toBeCalled();
    });
    it("Should call Stack, if isStack", () => {
      convert([], { isComplex: true, isStack: true });
      expect(Stack).toBeCalled();
    });
  });
  describe("Diagram", () => {
    it("Should call Diagram by default", () => {
      convert([]);
      expect(Diagram).toBeCalled();
    });
    it("Should not call Stack, by default", () => {
      convert([]), { isStack: false };
      expect(Stack).not.toBeCalled();
    });
    it("Should call Stack, if isStack", () => {
      convert([], { isStack: true });
      expect(Diagram).toBeCalled();
      expect(Stack).toBeCalled();
    });
  });
  describe("Leaves", () => {
    test("Terminal(text, href)", () => {
      convert([{ type: "terminal", text: "text", href: "href" }]);
      expect(Diagram).toBeCalledWith("Terminal");
      expect(Terminal).toBeCalledWith("text", "href");
    });
    test("NonTerminal(text, href)", () => {
      convert([{ type: "nonTerminal", text: "text", href: "href" }]);
      expect(Diagram).toBeCalledWith("NonTerminal");
      expect(NonTerminal).toBeCalledWith("text", "href");
    });
    test("Comment(text, href)", () => {
      convert([{ type: "comment", text: "text", href: "href" }]);
      expect(Diagram).toBeCalledWith("Comment");
      expect(Comment).toBeCalledWith("text", "href");
    });
    test("Skip()", () => {
      convert([{ type: "skip" }]);
      expect(Diagram).toBeCalledWith("Skip");
      expect(Skip).toBeCalled();
    });
  });
  describe("Containers", () => {
    describe("Choice", () => {
      test("Without default", () => {
        convert([
          {
            type: "choice",
            children: [{ type: "terminal", text: "test" }]
          }
        ]);
        expect(Choice).toBeCalledWith("Terminal");
      });
      test("With default", () => {
        convert([
          {
            type: "choice",
            default: 0,
            children: [{ type: "terminal", text: "test" }]
          }
        ]);
        expect(Choice).toBeCalledWith("Terminal", 0);
      });
    });
    describe("Optional", () => {
      test("Single child", () => {
        convert([
          {
            type: "optional",
            child: { type: "terminal", text: "test" }
          }
        ]);
        expect(Optional).toBeCalledWith("Terminal");
      });
      test("Sequenced children", () => {
        convert([
          {
            type: "optional",
            children: [
              { type: "terminal", text: "test" },
              { type: "terminal", text: "test" }
            ]
          }
        ]);
        expect(Optional).toBeCalledWith("Sequence");
      });
    });
    describe("Multiple", () => {
      describe("ZeroOrMore", () => {
        test("Single child", () => {
          convert([
            {
              type: "multiple",
              optional: true,
              child: { type: "terminal", text: "test" }
            }
          ]);
          expect(ZeroOrMore).toBeCalledWith("Terminal");
        });
        test("Sequenced children", () => {
          convert([
            {
              type: "multiple",
              optional: true,
              children: [{ type: "terminal", text: "test" }]
            }
          ]);
          expect(ZeroOrMore).toBeCalledWith("Sequence");
        });
        test("Default path", () => {
          convert([
            {
              type: "multiple",
              optional: true,
              skip: true,
              children: [{ type: "terminal", text: "test" }]
            }
          ]);
          expect(ZeroOrMore).toBeCalledWith("Sequence", undefined, "skip");
        });
      });
      describe("OneOrMore", () => {
        test("Single child", () => {
          convert([
            {
              type: "multiple",
              optional: false,
              child: { type: "terminal", text: "test" }
            }
          ]);
          expect(OneOrMore).toBeCalledWith("Terminal");
        });
        test("Sequenced children", () => {
          convert([
            {
              type: "multiple",
              optional: false,
              children: [{ type: "terminal", text: "test" }]
            }
          ]);
          expect(OneOrMore).toBeCalledWith("Sequence");
        });
      });
    });
  });
  test("Unrecognized type", () => {
    convert([{ type: "Not a type" }]);
    expect(Diagram).toBeCalledWith("Uh oh");
  });
});
