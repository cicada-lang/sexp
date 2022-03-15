import { InternalError, ParsingError } from "../errors"
import { Parser } from "../parser"
import { Cons, List, Null, Num, Sexp, Str, Sym } from "../sexp"
import { Position, Span, Token } from "../token"

type Result = { sexp: Sexp; remain: Array<Token> }

export class Parsing {
  index = 0

  constructor(public parser: Parser) {}

  parse(tokens: Array<Token>): Result {
    const token = tokens[0]

    if (token === undefined) {
      throw new ParsingError(
        "I expect to see a token, but there is no token remain.",
        new Span(Position.init(), Position.init())
      )
    }

    switch (token.kind) {
      case "Symbol": {
        if (this.parser.config.isNull(token.value)) {
          return {
            sexp: new Null(token.span),
            remain: tokens.slice(1),
          }
        }

        return {
          sexp: new Sym(token.value, token.span),
          remain: tokens.slice(1),
        }
      }

      case "Number": {
        const value = JSON.parse(token.value)
        if (typeof value !== "number") {
          throw new InternalError(
            `I expect value to be a JSON number: ${value}`
          )
        }

        return { sexp: new Num(value, token.span), remain: tokens.slice(1) }
      }

      case "String": {
        const value = JSON.parse(token.value)
        if (typeof value !== "string") {
          throw new InternalError(
            `I expect value to be a JSON string: ${value}`
          )
        }

        return { sexp: new Str(value, token.span), remain: tokens.slice(1) }
      }

      case "ParenthesisStart": {
        return this.parseList(token, tokens.slice(1), new Null(token.span))
      }

      case "ParenthesisEnd": {
        throw new ParsingError(`I found extra ParenthesisEnd`, token.span)
      }

      case "Quote": {
        const { sexp, remain } = this.parse(tokens.slice(1))

        const first = new Sym(
          this.parser.config.findQuoteSymbolOrFail(token.value),
          token.span
        )

        const second = new Cons(
          sexp,
          new Null(token.span),
          token.span.union(sexp.span)
        )

        return {
          sexp: new Cons(first, second, first.span.union(second.span)),
          remain,
        }
      }
    }
  }

  private parseList(start: Token, tokens: Array<Token>, ending: List): Result {
    if (tokens[0] === undefined) {
      throw new ParsingError(`Missing ParenthesisEnd`, start.span)
    }

    if (tokens[0].kind === "ParenthesisEnd") {
      if (!this.parser.config.matchParentheses(start.value, tokens[0].value)) {
        throw new ParsingError(`I expect a matching ParenthesisEnd`, start.span)
      }

      ending.span = tokens[0].span

      return { sexp: ending, remain: tokens.slice(1) }
    }

    const head = this.parse(tokens)

    const { sexp, remain } = this.parseList(start, head.remain, ending)

    return {
      sexp: new Cons(head.sexp, sexp, head.sexp.span.union(sexp.span)),
      remain,
    }
  }
}
