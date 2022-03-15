import { List, Sexp } from "../sexp"
import { Span } from "../token"

export class Cons extends List {
  constructor(public head: Sexp, public tail: Sexp, public span: Span) {
    super()
  }
}
