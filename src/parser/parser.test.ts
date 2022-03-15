import { ParserTestCase } from "./parser-test-case"

export default class extends ParserTestCase {
  ["test symbol"]() {
    this.assertParse("abc")
  }

  ["test string"]() {
    this.assertParse('"abc"')
  }

  ["test number"]() {
    this.assertParse("1")
    this.assertParse("0")
    this.assertParse("-1")
    this.assertParse("3.14")
  }

  ["test list"]() {
    this.assertParse("()")
    this.assertParse("(a b c)")
  }

  ["test non proper list"]() {
    this.assertParse("(a . d)")
    this.assertParse("(a b c . d)")
  }
}
