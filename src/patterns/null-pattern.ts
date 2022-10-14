import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"

export class NullPattern extends Pattern {
  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {},
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Null)) {
      throw new MatchingError(`I expect the sexp to be a null`, sexp.span)
    }

    return results
  }
}
