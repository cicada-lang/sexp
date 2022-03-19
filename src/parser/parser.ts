import { ParsingError } from "../errors"
import { Lexer } from "../lexer"
import { ParserConfig, ParserOptions } from "../parser"
import { Sexp } from "../sexp"
import { Token } from "../token"
import { Parsing } from "./parsing"

export class Parser {
  lexer: Lexer
  config: ParserConfig

  constructor(public options: ParserOptions) {
    this.lexer = new Lexer(options)
    this.config = this.lexer.config
  }

  parseSexp(text: string): Sexp {
    const tokens = this.lexer.lex(text)
    const { sexp, remain } = this.parseSexpFromTokens(tokens)
    if (remain.length !== 0) {
      throw new ParsingError(
        `I expect to consume all the tokens, but there are ${remain.length} tokens remain.`,
        remain[0].span
      )
    }

    return sexp
  }

  parseSexps(text: string): Array<Sexp> {
    const sexps: Array<Sexp> = []
    let tokens = this.lexer.lex(text)
    while (tokens.length > 0) {
      const { sexp, remain } = this.parseSexpFromTokens(tokens)
      sexps.push(sexp)
      if (remain.length === 0) return sexps
      tokens = remain
    }

    return sexps
  }

  protected parseSexpFromTokens(tokens: Array<Token>): {
    sexp: Sexp
    remain: Array<Token>
  } {
    const parsing = new Parsing(this)
    return parsing.parse(tokens)
  }
}
