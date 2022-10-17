import { match, matchOrFail } from "../pattern"
import { evaluate, PatternExp } from "../pattern-exp"
import { Sexp } from "../sexp"

export function matchSexp(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> | undefined {
  return match(evaluate(exp), sexp, {})
}

export function matchSexpOrFail(
  sexp: Sexp,
  exp: PatternExp,
): Record<string, Sexp> {
  return matchOrFail(evaluate(exp), sexp, {})
}
