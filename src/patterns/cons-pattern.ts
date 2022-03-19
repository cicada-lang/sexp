import { MatchingError } from "../errors"
import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"

export class ConsPattern extends Pattern {
  constructor(public head: Pattern, public tail: Pattern) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {}
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Cons)) {
      throw new MatchingError(`I expect the sexp to be a cons`, sexp.span)
    }

    results = this.head.matchOrFail(sexp.head, results)
    results = this.tail.matchOrFail(sexp.tail, results)

    return results
  }
}
