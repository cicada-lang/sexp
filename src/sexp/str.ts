import { Atom } from "../sexp"
import { Span } from "../token"

export class Str extends Atom {
  constructor(public value: string, public span?: Span) {
    super()
  }
}
