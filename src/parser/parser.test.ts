import { ParserTestCase } from "./parser-test-case"

export default class extends ParserTestCase {
  ["test sym"]() {
    this.assertParse("abc")
  }

  ["test list"]() {
    this.assertParse("(a b c)")
  }
}
