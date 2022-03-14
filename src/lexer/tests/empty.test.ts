import TestCase from "./test-case"

export default class extends TestCase {
  ["test empty text"]() {
    this.assertLex("", [])
  }

  ["test blank text"]() {
    this.assertLex("    ", [])
  }

  ["test a b c"]() {
    this.assertLex("a b c", [
      { kind: "Symbol", value: "a" },
      { kind: "Symbol", value: "b" },
      { kind: "Symbol", value: "c" },
    ])
  }
}
