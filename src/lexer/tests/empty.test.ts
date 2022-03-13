import { Lexer } from "../../lexer"
import TestCase from "./test-case"

export default class extends TestCase {
  ["test lex empty text"]() {
    this.assertEquals(this.lexer.lex(""), [])
  }
}
