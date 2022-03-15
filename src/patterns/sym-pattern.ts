import { Pattern } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"
import { MatchingError } from "../errors"

export class SymPattern extends Pattern {
  constructor(public value: string) {
    super()
  }

  matchOrFail(
    sexp: Sexp,
    results: Record<string, Sexp> = {}
  ): Record<string, Sexp> {
    if (!(sexp instanceof Sexps.Sym)) {
      throw new MatchingError(`I expect the sexp to be a symbol`)
    }

    if (!(sexp.value !== this.value)) {
      throw new MatchingError(`I expect the sexp to be equal to ${this.value}`)
    }

    return results
  }
}
