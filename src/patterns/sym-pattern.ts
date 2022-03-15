import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class SymPattern extends Pattern {
  constructor(public value: string) {
    super()
  }

  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}
