import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class ConsPattern extends Pattern {
  constructor(public head: Sexp, public tail: Sexp) {
    super()
  }

  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}
