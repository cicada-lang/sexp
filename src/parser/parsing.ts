import { Sexp } from "../sexp"
import { Token } from "../token"

export class Parsing {
  constructor(public tokens: Array<Token>) {}

  parse(): Sexp {
    throw new Error("TODO")
  }
}
