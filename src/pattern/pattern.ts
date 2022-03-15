import { Sexp } from "../sexp"
import { MatchingError } from "../errors"

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
