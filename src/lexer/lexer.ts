import { Token } from "../token"
import { Span } from "../span"
import { Sexp } from "../sexp"

export interface LexerConfig {
  parentheses: Array<{
    start: string
    end: string
  }>
}

export class Lexer {
  constructor(public config: LexerConfig) {}

  lex(text: string): Array<Token> {
    throw new Error("TODO")
  }
}
