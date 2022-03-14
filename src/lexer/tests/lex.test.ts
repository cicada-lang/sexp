import TestCase from "./test-case"

export default class extends TestCase {
  ["test blank text"]() {
    this.assertLex("", [])
    this.assertLex("\n", [])
    this.assertLex(" \n ", [])
    this.assertLex(" \n \t ", [])
    this.assertLex("    ", [])
  }

  ["test a b c"]() {
    this.assertLex("a b c", [
      { kind: "Symbol", value: "a" },
      { kind: "Symbol", value: "b" },
      { kind: "Symbol", value: "c" },
    ])
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
}
