import { InternalError, ParsingError } from "../errors"
import { Parser } from "../parser"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
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
            sexp: new Sexps.Null(token.span),
            remain: tokens.slice(1),
          }
        }

        return {
          sexp: new Sexps.Sym(token.value, token.span),
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

        return {
          sexp: new Sexps.Num(value, token.span),
          remain: tokens.slice(1),
        }
      }

      case "String": {
        const value = JSON.parse(token.value)
        if (typeof value !== "string") {
          throw new InternalError(
            `I expect value to be a JSON string: ${value}`
          )
        }

        return {
          sexp: new Sexps.Str(value, token.span),
          remain: tokens.slice(1),
        }
      }

      case "ParenthesisStart": {
        return this.parseList(
          token,
          tokens.slice(1),
          new Sexps.Null(token.span)
        )
      }

      case "ParenthesisEnd": {
        throw new ParsingError(`I found extra ParenthesisEnd`, token.span)
      }

      case "Quote": {
        const { sexp, remain } = this.parse(tokens.slice(1))

        const first = new Sexps.Sym(
          this.parser.config.findQuoteSymbolOrFail(token.value),
          token.span
        )

        const second = new Sexps.Cons(
          sexp,
          new Sexps.Null(token.span),
          token.span.union(sexp.span)
        )

        return {
          sexp: new Sexps.Cons(first, second, first.span.union(second.span)),
          remain,
        }
      }
    }
  }

  private parseList(
    start: Token,
    tokens: Array<Token>,
    list: Sexps.List
  ): Result {
    if (tokens[0] === undefined) {
      throw new ParsingError(`Missing ParenthesisEnd`, start.span)
    }

    if (tokens[0].kind === "Symbol" && tokens[0].value === ".") {
      const { sexp, remain } = this.parse(tokens.slice(1))

      if (!this.parser.config.matchParentheses(start.value, remain[0].value)) {
        throw new ParsingError(`I expect a matching ParenthesisEnd`, start.span)
      }

      return { sexp, remain: remain.slice(1) }
    }

    if (tokens[0].kind === "ParenthesisEnd") {
      if (!this.parser.config.matchParentheses(start.value, tokens[0].value)) {
        throw new ParsingError(`I expect a matching ParenthesisEnd`, start.span)
      }

      list.span = tokens[0].span

      return { sexp: list, remain: tokens.slice(1) }
    }

    const head = this.parse(tokens)

    const { sexp, remain } = this.parseList(start, head.remain, list)

    return {
      sexp: new Sexps.Cons(head.sexp, sexp, head.sexp.span.union(sexp.span)),
      remain,
    }
  }
}
