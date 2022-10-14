import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import { equal } from "../utils/equal"

export class VarPattern extends Pattern {
  constructor(public name: string) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {},
  ): Record<string, Sexp> {
    const found = results[this.name]
    if (found !== undefined) {
      if (!equal(found, sexp)) {
        throw new MatchingError(
          `I expect the sexp to be equal to ${found}, but it is ${sexp}`,
          sexp.span,
        )
      }

      return results
    }

    return { ...results, [this.name]: sexp }
  }
}
