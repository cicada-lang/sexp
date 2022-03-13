import { Lexer } from "../../lexer"
import { TestCase } from "../../infra/test-case"

const lexer = new Lexer({
  quotes: ["'"],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
    { start: "{", end: "}" },
  ],
  comments: [],
})

export default class extends TestCase {
  ["test lex empty text"]() {
    this.assertEquals(lexer.lex(""), [])
  }
}
