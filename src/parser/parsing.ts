import { InternalError, ParsingError } from "../errors"
import { Parser } from "../parser"
import { Cons, List, Null, Num, Sexp, Str, Sym } from "../sexp"
import { Position, Span, Token } from "../token"

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
        const { list, remain } = this.parseList(token, tokens.slice(1))

        return { sexp: list, remain }
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

  private parseList(
    startToken: Token,
    tokens: Array<Token>,
    ending: List = new Null(startToken.span)
  ): {
    list: List
    remain: Array<Token>
  } {
    if (tokens[0] === undefined) {
      throw new ParsingError(`Missing ParenthesisEnd`, startToken.span)
    }

    if (tokens[0].kind === "ParenthesisEnd") {
      if (
        !this.parser.config.matchParentheses(startToken.value, tokens[0].value)
      ) {
        throw new ParsingError(
          `I expect a matching ParenthesisEnd`,
          startToken.span
        )
      }

      ending.span = tokens[0].span

      return { list: ending, remain: tokens.slice(1) }
    }

    const { sexp, remain } = this.parse(tokens)

    const result = this.parseList(startToken, remain, ending)

    return {
      list: new Cons(
        sexp,
        result.list,
        sexp.span.union(result.list.span)
      ),
      remain: result.remain,
    }
  }
}
