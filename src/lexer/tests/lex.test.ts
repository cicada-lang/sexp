import TestCase from "./test-case"

export default class extends TestCase {
  ["test blank text"]() {
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

    // this.assertLex("abc", [{ kind: "Symbol", value: "abc" }])
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

    this.assertLex("[  ]", [
      { kind: "ParenthesisStart", value: "[" },
      { kind: "ParenthesisEnd", value: "]" },
    ])

    this.assertLex("([{ }])", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisStart", value: "[" },
      { kind: "ParenthesisStart", value: "{" },
      { kind: "ParenthesisEnd", value: "}" },
      { kind: "ParenthesisEnd", value: "]" },
      { kind: "ParenthesisEnd", value: ")" },
    ])
  }
}
