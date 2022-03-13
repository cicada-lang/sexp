import { Token } from "../token"
import { Lexing } from "./lexing"

export interface LexerConfig {
  quotes: Array<string>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
}

export class Lexer {
  constructor(public config: LexerConfig) {}

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(this, text))
  }
}
