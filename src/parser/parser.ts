import { Lexer } from "../lexer"
import { Token } from "../token"
import { Span } from "../span"
import { Sexp } from "../sexp"

export class Parser {
  lexer: Lexer

  constructor(opts: { lexer: Lexer }) {
    this.lexer = opts.lexer
  }

  parse(text: string): Sexp {
    return this.parseTokens(this.lexer.lex(text))
  }

  parseTokens(tokens: Array<Token>): Sexp {
    throw new Error("TODO")
  }
}
