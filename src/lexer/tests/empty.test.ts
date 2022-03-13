import { Lexer } from "../../lexer"
import { assertEquals } from "../../utilities/assertions"
import { test } from "../../utilities/test"

const lexer = new Lexer({
  quotes: ["'"],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
    { start: "{", end: "}" },
  ],
  comments: [],
})

test("lex empty text", async () => {
  assertEquals(lexer.lex(""), [])
})
