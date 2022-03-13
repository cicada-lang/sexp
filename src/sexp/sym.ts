import { Atom } from "../sexp"
import { Span } from "../span"

export class Sym extends Atom {
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