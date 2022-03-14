import { Atom } from "../sexp"
import { Span } from "../token"

export class Null extends Atom {
  constructor(public span?: Span) {
    super()
  }
}
