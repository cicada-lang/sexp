import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"

export class Null extends Pattern {
  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {},
  ): Record<string, Sexp> {
    if (sexp.kind !== "Null") {
      throw new MatchingError(`I expect the sexp to be a null`, sexp.span)
    }

    return results
  }
}
