import { list, str } from "../pattern"
import { ParserTestCase } from "./parser-test-case"

export default class extends ParserTestCase {
  ["test symbol"]() {
    this.assertSexp("abc", "abc")
  }

  ["test string"]() {
    this.assertSexp('"abc"', str("abc"))
  }

  ["test number"]() {
    this.assertSexp("1", 1)
    this.assertSexp("0", 0)
    this.assertSexp("-1", -1)
    this.assertSexp("3.14", 3.14)
  }

  ["test list"]() {
    this.assertSexp("()", [])
    this.assertSexp("(a b c)", ["a", "b", "c"])
  }

  ["test non proper list"]() {
    this.assertSexp("(a . d)", list(["a"], "d"))
    this.assertSexp("(a b c . d)", list(["a", "b", "c"], "d"))
  }
}
