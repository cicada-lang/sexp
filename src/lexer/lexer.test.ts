import { LexerTestCase } from "./lexer-test-case"

export default class extends LexerTestCase {
  ["test blank"]() {
    this.assertTokens("", [])
    this.assertTokens("\n", [])
    this.assertTokens(" \n ", [])
    this.assertTokens(" \n \t ", [])
    this.assertTokens("    ", [])
  }

  ["test symbol"]() {
    this.assertTokens("a b c", [
      { kind: "Symbol", value: "a" },
      { kind: "Symbol", value: "b" },
      { kind: "Symbol", value: "c" },
    ])

    this.assertTokens("abc", [{ kind: "Symbol", value: "abc" }])

    this.assertTokens("3-sphere", [{ kind: "Symbol", value: "3-sphere" }])
  }

  ["test quotes"]() {
    this.assertTokens("'a", [
      { kind: "Quote", value: "'" },
      { kind: "Symbol", value: "a" },
    ])

    this.assertTokens("'  a", [
      { kind: "Quote", value: "'" },
      { kind: "Symbol", value: "a" },
    ])
  }

  ["test parentheses"]() {
    this.assertTokens("()", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertTokens("( )", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertTokens("(a)(b)", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "Symbol", value: "a" },
      { kind: "ParenthesisEnd", value: ")" },
      { kind: "ParenthesisStart", value: "(" },
      { kind: "Symbol", value: "b" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertTokens("([{x}])", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "ParenthesisStart", value: "[" },
      { kind: "ParenthesisStart", value: "{" },
      { kind: "Symbol", value: "x" },
      { kind: "ParenthesisEnd", value: "}" },
      { kind: "ParenthesisEnd", value: "]" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertTokens("(head . tail)", [
      { kind: "ParenthesisStart", value: "(" },
      { kind: "Symbol", value: "head" },
      { kind: "Symbol", value: "." },
      { kind: "Symbol", value: "tail" },
      { kind: "ParenthesisEnd", value: ")" },
    ])

    this.assertTokens("abc", [{ kind: "Symbol", value: "abc" }])
  }

  ["test comments"]() {
    this.assertTokens("; abc", [])
    this.assertTokens("; abc\n", [])
    this.assertTokens("; abc\nabc", [{ kind: "Symbol", value: "abc" }])

    this.assertTokens("// abc", [])
    this.assertTokens("// abc\n", [])
    this.assertTokens("// abc\nabc", [{ kind: "Symbol", value: "abc" }])
  }

  ["test string"]() {
    this.assertTokens('"abc"', [{ kind: "String", value: '"abc"' }])

    this.assertTokens('"abc" "abc"', [
      { kind: "String", value: '"abc"' },
      { kind: "String", value: '"abc"' },
    ])

    this.assertTokens('"abc""abc"', [
      { kind: "String", value: '"abc"' },
      { kind: "String", value: '"abc"' },
    ])

    this.assertTokens('"//"', [{ kind: "String", value: '"//"' }])
  }

  ["test number"]() {
    this.assertTokens("1", [{ kind: "Number", value: "1" }])
    this.assertTokens("-1", [{ kind: "Number", value: "-1" }])

    this.assertTokens("3.14 3.14", [
      { kind: "Number", value: "3.14" },
      { kind: "Number", value: "3.14" },
    ])
  }
}
