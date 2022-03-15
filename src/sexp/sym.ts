import { Sexp } from "../sexp"
import { Span } from "../token"

export class Sym extends Sexp {
  constructor(public value: string, public span: Span) {
    super()
  }
}
