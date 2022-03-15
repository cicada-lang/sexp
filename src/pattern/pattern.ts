import { MatchingError } from "../errors"
import { Sexp } from "../sexp"

export abstract class Pattern {
  abstract matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp>
  ): Record<string, Sexp>

  match(
    sexp: Sexp,
    results: Record<string, Sexp>
  ): Record<string, Sexp> | undefined {
    try {
      return this.matchOrFail(sexp, results)
    } catch (error) {
      if (error instanceof MatchingError) return undefined
      else throw error
    }
  }
}
