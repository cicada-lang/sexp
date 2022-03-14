import { Lexer } from "../lexer"
import { Span, Position } from "../span"
import { Token } from "../token"

export class Lexing implements Iterator<Token> {
  index = 0

  constructor(public lexer: Lexer, public text: string) {}

  [Symbol.iterator](): Iterator<Token> {
    return this
  }

  private nextChar(): string | undefined {
    while (true) {
      const char = this.text[this.index++]
      if (char === undefined) return undefined
      if (char.trim() !== "") return char
    }
  }

  private position(): Position {
    return {
      index: this.index,
      row: 0,
      column: 0,
    }
  }

  next(): IteratorResult<Token> {
    const start = this.position()

    const char = this.nextChar()
    if (char === undefined) {
      return { done: true, value: undefined }
    }

    const end = this.position()

    const span = new Span(start, end)

    const value = new Token({ kind: "Symbol", value: char, span })

    return { done: false, value }
  }
}
