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
            `I Expect value to be a JSON number: ${value}`
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
            `I Expect value to be a JSON string: ${value}`
          )
        }

        return {
          sexp: new Str(value, token.span),
          remain: tokens.slice(1),
        }
      }

      case "ParenthesisStart": {
        Cons
        throw new Error("TODO")
      }

      case "ParenthesisEnd": {
        Cons
        throw new Error("TODO")
      }

      case "Quote": {
        Cons
        throw new Error("TODO")
      }
    }
  }

  parseMany(tokens: Array<Token>): {
    sexps: Array<Sexp>
    ending?: Sexp,
    remain: Array<Token>
  } {
    throw new Error("TODO")
    return { sexps: [], remain: [] }
  }
}
