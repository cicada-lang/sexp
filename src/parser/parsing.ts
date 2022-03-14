import { Num, Sexp, Sym, Str, Null, Cons } from "../sexp"
import { Token } from "../token"
import { InternalError } from "../errors"

export class Parsing {
  index = 0

  constructor(public tokens: Array<Token>) {}

  get token(): Token {
    return this.tokens[this.index]
  }

  parse(): Sexp {
    switch (this.token.kind) {
      case "Symbol": {
        return new Sym(this.token.value, this.token.span)
      }

      case "Number": {
        const value = JSON.parse(this.token.value)
        if (typeof value !== "number") {
          throw new InternalError(
            `I Expect value to be a JSON number: ${value}`
          )
        }

        return new Num(value, this.token.span)
      }

      case "String": {
        const value = JSON.parse(this.token.value)
        if (typeof value !== "string") {
          throw new InternalError(
            `I Expect value to be a JSON string: ${value}`
          )
        }

        return new Str(value, this.token.span)
      }

      case "Quote":
      case "ParenthesisStart":
      case "ParenthesisEnd":
      default:
        throw new Error("TODO")
    }
  }
}
