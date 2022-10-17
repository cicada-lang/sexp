import { Sexp } from "../sexp"
import { Span } from "../span"

export class Null extends Sexp {
  constructor(public span: Span) {
    super()
  }
}
