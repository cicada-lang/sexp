import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"

export class Num extends Pattern {
  constructor(public value: number) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {},
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Num)) {
      throw new MatchingError(`I expect the sexp to be a number`, sexp.span)
    }

    if (!(sexp.value === this.value)) {
      throw new MatchingError(
        `I expect the sexp to be equal to ${this.value}, but it is ${sexp.value}`,
        sexp.span,
      )
    }

    return results
  }
}
