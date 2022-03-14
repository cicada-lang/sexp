import { Atom } from "../sexp"
import { Span } from "../token"

export class Num extends Atom {
  span?: Span

  constructor(
    public value: number,
    opts: {
      span?: Span
    }
  ) {
    super()
    this.span = opts.span
  }
}
