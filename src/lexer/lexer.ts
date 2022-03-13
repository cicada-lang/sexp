import { Token } from "../token"
import { Span } from "../span"
import { Sexp } from "../sexp"

export interface LexerConfig {
  marks: Array<string>
  quotes: Array<{ mark: string; symbol: string }>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
}

export class Lexer {
  constructor(public config: LexerConfig) {}

  lex(text: string): Array<Token> {
    throw new Error("TODO")
  }
}
