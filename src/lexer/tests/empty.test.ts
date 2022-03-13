import { Lexer } from "../../lexer"

const lexer = new Lexer({
  quotes: ["'"],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
    { start: "{", end: "}" },
  ],
  comments: [],
})

console.log(lexer.lex(""))
