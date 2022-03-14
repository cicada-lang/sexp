import { Lexer } from "../lexer"
import { Position, Span, Token } from "../token"

export class Lexing implements Iterator<Token> {
  position = Position.init()

  constructor(public lexer: Lexer, public text: string) {}

  [Symbol.iterator](): Iterator<Token> {
    return this
  }

  private nextChar(): string | undefined {
    while (true) {
      const char = this.text[this.position.index++]
      if (char === undefined) return undefined
      if (char.trim() !== "") return char
    }
  }

  next(): IteratorResult<Token> {
    const start = this.position

    const char = this.nextChar()
    if (char === undefined) {
      return { done: true, value: undefined }
    }

    if (this.lexer.config.quotes.map(({ mark }) => mark).includes(char)) {
      const end = this.position
      const span = new Span(start, end)
      const value = new Token({ kind: "Quote", value: char, span })
      return { done: false, value }
    }

    if (
      this.lexer.config.parentheses.flatMap(({ start }) => start).includes(char)
    ) {
      const end = this.position
      const span = new Span(start, end)
      const value = new Token({ kind: "ParenthesisStart", value: char, span })
      return { done: false, value }
    }

    if (
      this.lexer.config.parentheses.flatMap(({ end }) => end).includes(char)
    ) {
      const end = this.position
      const span = new Span(start, end)
      const value = new Token({ kind: "ParenthesisEnd", value: char, span })
      return { done: false, value }
    }

    const end = this.position
    const span = new Span(start, end)
    const value = new Token({ kind: "Symbol", value: char, span })
    return { done: false, value }
  }
}
