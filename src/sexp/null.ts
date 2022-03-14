import { Atom } from "../sexp"
import { Span } from "../token"

export class Null extends Atom {
  span?: Span

  constructor(options: { span?: Span }) {
    super()
  }
}
