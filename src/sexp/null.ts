import { Atom } from "../sexp"
import { Span } from "../span"

export class Null extends Atom {
  span?: Span

  constructor(opts: { span?: Span }) {
    super()
  }
}
