import { evaluate, PatternExp } from "../pattern-exp"
import { Sexp } from "../sexp"

export function matchSexp(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> | undefined {
  return evaluate(exp).match(sexp, {})
}

export function matchSexpOrFail(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> {
  return evaluate(exp).matchOrFail(sexp, {})
}
