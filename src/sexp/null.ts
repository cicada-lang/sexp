import { Atom } from "../sexp"
import { Span } from "../token"

export class Null extends Atom {
  span?: Span

  constructor(opts: { span?: Span }) {
    super()
  }
}
