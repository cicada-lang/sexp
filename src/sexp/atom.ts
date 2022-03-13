import { Sexp } from "../sexp"
import { Span } from "../span"

export abstract class Atom extends Sexp {
  span?: Span

  constructor(
    public value: string,
    opts: {
      span?: Span
    }
  ) {
    super()
    this.span = opts.span
  }
}
