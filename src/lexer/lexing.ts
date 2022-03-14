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

    if (this.isQuote(char)) return this.nextQuote(char, start)
    if (this.isParenthesisStart(char))
      return this.nextParenthesisStart(char, start)
    if (this.isParenthesisEnd(char)) return this.nextParenthesisEnd(char, start)
    else return this.nextSymbol(char, start)
  }

  private nextSymbol(char: string, start: Position): IteratorResult<Token> {
    const end = this.position
    const span = new Span(start, end)
    const value = new Token({ kind: "Symbol", value: char, span })
    return { done: false, value }
  }

  private isQuote(char: string): boolean {
    return this.lexer.config.quotes.map(({ mark }) => mark).includes(char)
  }

  private nextQuote(char: string, start: Position): IteratorResult<Token> {
    const end = this.position
    const span = new Span(start, end)
    const value = new Token({ kind: "Quote", value: char, span })
    return { done: false, value }
  }

  private isParenthesisStart(char: string): boolean {
    return this.lexer.config.parentheses
      .flatMap(({ start }) => start)
      .includes(char)
  }

  private nextParenthesisStart(
    char: string,
    start: Position
  ): IteratorResult<Token> {
    const end = this.position
    const span = new Span(start, end)
    const value = new Token({ kind: "ParenthesisStart", value: char, span })
    return { done: false, value }
  }

  private isParenthesisEnd(char: string): boolean {
    return this.lexer.config.parentheses
      .flatMap(({ end }) => end)
      .includes(char)
  }

  private nextParenthesisEnd(
    char: string,
    start: Position
  ): IteratorResult<Token> {
    const end = this.position
    const span = new Span(start, end)
    const value = new Token({ kind: "ParenthesisEnd", value: char, span })
    return { done: false, value }
  }
}
