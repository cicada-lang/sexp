import { Lexer } from "../lexer"
import { Span } from "../span"
import { Token } from "../token"

export class Lexing implements Iterator<Token> {
  index = 0

  constructor(public lexer: Lexer, public text: string) {}

  [Symbol.iterator](): Iterator<Token> {
    return this
  }

  next(): IteratorResult<Token> {
    if (this.index >= this.text.length) {
      return { done: true, value: undefined }
    }

    const span = new Span({ start: 0, end: 0, row: 0, column: 0 })

    const token = new Token({ kind: "Symbol", value: "TODO", span })

    return { done: false, value: token }
  }
}
