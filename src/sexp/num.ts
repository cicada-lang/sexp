import { Atom } from "../sexp"
import { Span } from "../token"

export class Num extends Atom {
  constructor(public value: number, public span?: Span) {
    super()
  }
}
