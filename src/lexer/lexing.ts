import { Lexer } from "../lexer"
import { Position, Span, Token, TokenKind } from "../token"

export class Lexing implements Iterator<Token> {
  position = Position.init()

  handlers: Array<CharHandler> = [
    new SpaceHandler(this),
    new QuoteHandler(this),
    new ParenthesisStartHandler(this),
    new ParenthesisEndHandler(this),
    new CommentHandler(this),
    new SymbolHandler(this),    
  ]

  constructor(public lexer: Lexer, public text: string) {}

  [Symbol.iterator](): Iterator<Token> {
    return this
  }

  get char(): string | undefined {
    return this.text[this.position.index]
  }

  get rest(): string {
    return this.text.slice(this.position.index)
  }

  forward(): void {
    this.position.index++
  }

  next(): IteratorResult<Token> {
    while (this.char !== undefined) {
      const result = this.handleChar(this.char)
      if (result !== undefined) return result
    }

    return { done: true, value: undefined }
  }

  private handleChar(char: string): IteratorResult<Token> | undefined {
    for (const handler of this.handlers) {
      if (handler.canHandle(char)) {
        const start = this.position
        this.forward()
        const value = handler.handle(char)
        if (handler.kind === undefined) return undefined
        const end = this.position
        const span = new Span(start, end)
        const token = new Token({ kind: handler.kind, value, span })
        return { done: false, value: token }
      }
    }

    throw new Error(`Can not handle char: ${char}`)
  }
}

abstract class CharHandler {
  constructor(public lexing: Lexing) {}

  abstract kind: TokenKind | undefined

  abstract canHandle(char: string): boolean
  abstract handle(char: string): string

  get lexer(): Lexer {
    return this.lexing.lexer
  }
}

class SpaceHandler extends CharHandler {
  kind = undefined

  canHandle(char: string): boolean {
    return char.trim() === ""
  }

  handle(char: string): string {
    let value = char
    while (this.lexing.char !== undefined && this.lexing.char.trim() === "") {
      value += this.lexing.char
      this.lexing.forward()
    }

    return value
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

class CommentHandler extends CharHandler {
  kind = "Comment" as const

  canHandle(char: string): boolean {
    const text = char + this.lexing.rest
    return this.lexer.config.comments.some((prefix) => text.startsWith(prefix))
  }

  handle(char: string): string {
    let value = char

    while (this.lexing.char !== undefined && this.lexing.char !== "\n") {
      value += this.lexing.char
      this.lexing.forward()
    }

    return value
  }
}

class SymbolHandler extends CharHandler {
  kind = "Symbol" as const

  canHandle(char: string): boolean {
    return true
  }

  handle(char: string): string {
    let value = char

    while (
      this.lexing.char !== undefined &&
      this.lexing.char.trim() !== "" &&
      !this.lexer.marks.includes(this.lexing.char)
    ) {
      value += this.lexing.char
      this.lexing.forward()
    }

    return value
  }
}
