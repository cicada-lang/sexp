import TestCase from "./test-case"

export default class extends TestCase {
  ["test blank"]() {
    this.assertLex("", [])
    this.assertLex("\n", [])
    this.assertLex(" \n ", [])
    this.assertLex(" \n \t ", [])
    this.assertLex("    ", [])
  }

  ["test symbol"]() {
    this.assertLex("a b c", [
      { kind: "Symbol", value: "a" },
      { kind: "Symbol", value: "b" },
      { kind: "Symbol", value: "c" },
    ])

    this.assertLex("abc", [{ kind: "Symbol", value: "abc" }])
  }

  ["test quotes"]() {
    this.assertLex("'a", [
      { kind: "Quote", value: "'" },
      { kind: "Symbol", value: "a" },
    ])

    this.assertLex("'  a", [
      { kind: "Quote", value: "'" },
      { kind: "Symbol", value: "a" },
    ])
  }

  ["test parentheses"]() {
    this.assertLex("()", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertLex("( )", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertLex("(a)(b)", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "Symbol", value: "a" },
      { kind: "ParenthesisEnd", value: ")" },
      { kind: "ParenthesisStart", value: "(" },
      { kind: "Symbol", value: "b" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertLex("([{x}])", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisStart", value: "[" },
      { kind: "ParenthesisStart", value: "{" },
      { kind: "Symbol", value: "x" },
      { kind: "ParenthesisEnd", value: "}" },
      { kind: "ParenthesisEnd", value: "]" },
      { kind: "ParenthesisEnd", value: ")" },
    ])
  }

  ["test comments"]() {
    this.assertLex("; abc", [{ kind: "Comment", value: "; abc" }])
    this.assertLex("; abc\n", [{ kind: "Comment", value: "; abc" }])
    this.assertLex("; abc\nabc", [
      { kind: "Comment", value: "; abc" },
      { kind: "Symbol", value: "abc" },
    ])

    this.assertLex("// abc", [{ kind: "Comment", value: "// abc" }])
    this.assertLex("// abc\n", [{ kind: "Comment", value: "// abc" }])
    this.assertLex("// abc\nabc", [
      { kind: "Comment", value: "// abc" },
      { kind: "Symbol", value: "abc" },
    ])
  }

  ["test string"]() {
    this.assertLex('"abc"', [{ kind: "String", value: "abc" }])
    this.assertLex('"abc" "abc"', [
      { kind: "String", value: "abc" },
      { kind: "String", value: "abc" },
    ])

    this.assertLex('"//"', [{ kind: "String", value: "//" }])
  }
}
