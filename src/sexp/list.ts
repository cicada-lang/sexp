import { Sexp } from "../sexp"
import { Span } from "../span"

type Parentheses = {
  start: string
  end: string
}

export class List extends Sexp {
  span?: Span
  parentheses: Parentheses

  constructor(public exps: Array<Sexp>, opts: { parentheses: Parentheses }) {
    super()
    this.parentheses = opts.parentheses
  }
}
