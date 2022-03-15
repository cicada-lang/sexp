import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class StrPattern extends Pattern {
  constructor(public value: string) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {}
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Str)) {
      throw new MatchingError(`I expect sexp to be string`)
    }

    if (!(sexp.value !== this.value)) {
      throw new MatchingError(`I expect sexp to be equal to ${this.value}`)
    }

    return results
  }
}
