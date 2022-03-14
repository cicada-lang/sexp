import { Lexer } from "../lexer"
import { Position, Span, Token, TokenKind } from "../token"

export class Lexing implements Iterator<Token> {
  position = Position.init()

  handlers: Array<CharHandler> = [
    new QuoteHandler(this),
    new ParenthesisStartHandler(this),
    new ParenthesisEndHandler(this),
    new SymbolHandler(this),
  ]

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

    for (const handler of this.handlers) {
      if (handler.canHandle(char)) {
        const end = this.position

        const token = new Token({
          kind: handler.kind,
          value: handler.handle(char),
          span: new Span(start, end),
        })

        return { done: false, value: token }
      }
    }

    throw new Error(`Can not handle char: ${char}`)
  }
}

abstract class CharHandler {
  constructor(public lexing: Lexing) {}

  abstract kind: TokenKind

  abstract canHandle(char: string): boolean
  abstract handle(char: string): string

  get lexer(): Lexer {
    return this.lexing.lexer
  }
}

class ParenthesisStartHandler extends CharHandler {
  kind = "ParenthesisStart" as const

  canHandle(char: string): boolean {
    return this.lexer.config.parentheses
      .map(({ start }) => start)
      .includes(char)
  }

  handle(char: string): string {
    return char
  }
}

class ParenthesisEndHandler extends CharHandler {
  kind = "ParenthesisEnd" as const

  canHandle(char: string): boolean {
    return this.lexer.config.parentheses.map(({ end }) => end).includes(char)
  }

  handle(char: string): string {
    return char
  }
}

class QuoteHandler extends CharHandler {
  kind = "Quote" as const

  canHandle(char: string): boolean {
    return this.lexer.config.quotes.map(({ mark }) => mark).includes(char)
  }

  handle(char: string): string {
    return char
  }
}

class SymbolHandler extends CharHandler {
  kind = "Symbol" as const

  canHandle(char: string): boolean {
    return true
  }

  handle(char: string): string {
    return char
  }
}
