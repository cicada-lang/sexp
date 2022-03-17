import { Sexp } from "../sexp"
import { List } from "../sexps"
import { Span } from "../span"

export class Cons extends List {
  constructor(public head: Sexp, public tail: Sexp, public span: Span) {
    super()
  }
}
