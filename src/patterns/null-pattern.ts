import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class NullPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}
