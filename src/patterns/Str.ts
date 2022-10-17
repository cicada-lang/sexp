import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"

export class Str extends Pattern {
  constructor(public value: string) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {},
  ): Record<string, Sexp> {
    if (!(sexp.kind === "Str")) {
      throw new MatchingError(`I expect the sexp to be a string`, sexp.span)
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
