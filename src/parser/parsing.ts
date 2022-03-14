import { InternalError } from "../errors"
import { Parser } from "../parser"
import { Cons, Null, Num, Sexp, Str, Sym } from "../sexp"
import { Token } from "../token"

export class Parsing {
  index = 0

  constructor(public parser: Parser, public tokens: Array<Token>) {}

  get token(): Token {
    return this.tokens[this.index]
  }

  parse(): Sexp {
    switch (this.token.kind) {
      case "Symbol": {
        if (this.parser.config.isNull(this.token.value)) {
          return new Null(this.token.span)
        }

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
}
