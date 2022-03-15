import { Sexp } from "../sexp"
import { Span } from "../token"

export class Num extends Sexp {
  constructor(public value: number, public span: Span) {
    super()
  }
}
