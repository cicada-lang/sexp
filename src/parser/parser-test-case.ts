import { TestCase } from "../infra/test-case"
import { Lexer } from "../lexer"
import { Parser } from "../parser"

export class ParserTestCase extends TestCase {
  lexer = new Lexer({
    quotes: [
      { mark: "'", symbol: "quote" },
      { mark: ",", symbol: "unquote" },
      { mark: "`", symbol: "quasiquote" },
    ],
    parentheses: [
      { start: "(", end: ")" },
      { start: "[", end: "]" },
      { start: "{", end: "}" },
    ],
    comments: [";", "//"],
    nulls: ["null"],
  })

  parser = new Parser({
    lexer: this.lexer,
  })

  assertSexp(text: string, x?: any): void {
    const sexp = this.parser.parse(text)

    console.dir(sexp, { depth: null })
  }
}
