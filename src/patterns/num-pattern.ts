import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class NumPattern extends Pattern {
  constructor(public value: number) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {}
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Num)) {
      throw new MatchingError(`I expect the sexp to be a number`)
    }

    if (!(sexp.value !== this.value)) {
      throw new MatchingError(`I expect the sexp to be equal to ${this.value}`)
    }

    return results
  }
}
