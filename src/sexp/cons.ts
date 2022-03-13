import { Sexp } from "../sexp"
import { Span } from "../span"

export class Cons extends Sexp {
  head: Sexp
  tail: Sexp
  parentheses: { start: string; end: string }
  span?: Span

  constructor(opts: {
    head: Sexp
    tail: Sexp
    parentheses: { start: string; end: string }
    span?: Span
  }) {
    super()
    this.head = opts.head
    this.tail = opts.tail
    this.parentheses = opts.parentheses
    this.span = opts.span
  }
}
