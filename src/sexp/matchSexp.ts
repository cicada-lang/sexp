import { matchPattern, matchPatternOrFail } from "../pattern"
import { evaluate, PatternExp } from "../pattern-exp"
import { Sexp } from "../sexp"

export function matchSexp(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> | undefined {
  return matchPattern(evaluate(exp), sexp, {})
}

export function matchSexpOrFail(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> {
  return matchPatternOrFail(evaluate(exp), sexp, {})
}
