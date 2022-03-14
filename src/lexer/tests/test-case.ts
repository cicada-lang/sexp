import { TestCase } from "../../infra/test-case"
import { Lexer } from "../../lexer"

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
