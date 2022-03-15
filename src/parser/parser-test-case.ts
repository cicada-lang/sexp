import { TestCase } from "../infra/test-case"
import { Lexer } from "../lexer"
import { Parser } from "../parser"
import { evaluatePatternExp, PatternExp } from "../pattern"

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

  assertSexp(text: string, exp: PatternExp): void {
    const sexp = this.parser.parse(text)
    evaluatePatternExp(exp).matchOrFail(sexp)
  }
}
