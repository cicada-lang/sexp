import { Sexp } from "../sexp"
import { Span } from "../span"

export class Cons extends Sexp {
  constructor(public head: Sexp, public tail: Sexp, public span: Span) {
    super()
  }
}
