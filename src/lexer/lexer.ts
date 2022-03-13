import { Span } from "../span"
import { Token } from "../token"

export interface LexerConfig {
  quotes: Array<{ mark: string; symbol: string }>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
}

export class Lexer {
  constructor(public config: LexerConfig) {}

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(text, this.config))
  }
}

class Lexing {
  index = 0

  constructor(public text: string, public config: LexerConfig) {}

  get marks(): Array<string> {
    throw new Error("TODO")
  }

  [Symbol.iterator]() {
    return this
  }

  next(): { value: Token; done: boolean } {
    return {
      done: true,
      value: new Token({
        kind: "Symbol",
        value: "TODO",
        span: new Span({
          start: 0,
          end: 0,
          row: 0,
          column: 0,
        }),
      }),
    }
  }
}
