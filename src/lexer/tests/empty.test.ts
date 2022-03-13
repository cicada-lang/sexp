import { Lexer } from "../../lexer"
import { test } from "../../utilities/test"
import { assertEqual } from "../../utilities/assertions"

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
  assertEqual(lexer.lex(""), [])
})
