import { Lexer } from "../lexer"
import { Span } from "../span"
import { Token } from "../token"

export class Lexing {
  index = 0

  constructor(public lexer: Lexer, public text: string) {}

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
