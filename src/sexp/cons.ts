import { Sexp } from "../sexp"
import { Span } from "../token"

export class Cons extends Sexp {
  head: Sexp
  tail: Sexp
  parentheses: { start: string; end: string }
  span?: Span

  constructor(options: {
    head: Sexp
    tail: Sexp
    parentheses: { start: string; end: string }
    span?: Span
  }) {
    super()
    this.head = options.head
    this.tail = options.tail
    this.parentheses = options.parentheses
    this.span = options.span
  }
}
