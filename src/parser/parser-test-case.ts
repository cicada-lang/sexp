import { ParsingError } from "../errors"
import { TestCase } from "../infra/test-case"
import { Lexer } from "../lexer"
import { Parser } from "../parser"
import { evaluatePatternExp, PatternExp } from "../pattern"
import { Sexp } from "../sexp"

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

  assertSexp(text: string, exp: PatternExp): Record<string, Sexp> {
    try {
      const sexp = this.parser.parse(text)
      const pattern = evaluatePatternExp(exp)
      return pattern.matchOrFail(sexp, {})
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.log(report)
      }

      throw error
    }
  }
}
