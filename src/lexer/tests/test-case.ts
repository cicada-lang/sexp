import { Lexer } from "../../lexer"
import { TestCase } from "../../infra/test-case"

export default class extends TestCase {
  lexer = new Lexer({
    quotes: ["'"],
    parentheses: [
      { start: "(", end: ")" },
      { start: "[", end: "]" },
      { start: "{", end: "}" },
    ],
    comments: [],
  })
}
