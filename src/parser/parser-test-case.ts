import { ParsingError } from "../errors"
import { TestCase } from "../infra/test-case"
import { Lexer } from "../lexer"
import { Parser } from "../parser"
import { PatternExp } from "../pattern"
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

  assertSexps(
    text: string,
    exps: Array<PatternExp>
  ): Array<Record<string, Sexp>> {
    try {
      const sexps = this.parser.parseMany(text)
      if (sexps.length !== exps.length) {
        throw new Error(
          `Length mismatch, sexps: ${sexps.length}, exps: ${exps.length}`
        )
      }

      return sexps.map((sexp, i) => sexp.matchOrFail(exps[i]))
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.log(report)
      }

      throw error
    }
  }

  assertSexp(text: string, exp: PatternExp): Record<string, Sexp> {
    try {
      const sexp = this.parser.parse(text)
      return sexp.matchOrFail(exp)
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.log(report)
      }

      throw error
    }
  }
}
