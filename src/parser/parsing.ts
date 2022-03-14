import { InternalError, ParsingError } from "../errors"
import { Parser } from "../parser"
import { Cons, Null, Num, Sexp, Str, Sym } from "../sexp"
import { Token } from "../token"

export class Parsing {
  index = 0

  constructor(public parser: Parser) {}

  parse(tokens: Array<Token>): {
    sexp: Sexp
    remain: Array<Token>
  } {
    const token = tokens[0]

    if (token === undefined) {
      throw new ParsingError(
        "I expect to see a token, but there is no token remain."
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

        return {
          sexp: new Num(value, token.span),
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
          sexp: new Str(value, token.span),
          remain: tokens.slice(1),
        }
      }

      case "ParenthesisStart": {
        const { cons, remain } = this.parseCons(tokens.slice(1))

        if (
          remain[0] === undefined ||
          remain[0].kind !== "ParenthesisEnd" ||
          !this.parser.config.matchParentheses(token.value, remain[0].value)
        ) {
          throw new ParsingError(
            `I expect a matching ParenthesisEnd`,
            token.span
          )
        }

        return {
          sexp: cons,
          remain: remain.slice(1),
        }
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

        const second = new Cons(sexp, new Null(token.span), token.span)

        return {
          sexp: new Cons(first, second, token.span),
          remain,
        }
      }
    }
  }

  private parseCons(tokens: Array<Token>): {
    cons: Cons
    remain: Array<Token>
  } {
    throw new Error("TODO")
  }
}
