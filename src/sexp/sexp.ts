import { evaluatePatternExp, PatternExp } from "../pattern"
import { Span } from "../token"

export abstract class Sexp {
  abstract span: Span

  match(exp: PatternExp): Record<string, Sexp> | undefined {
    return evaluatePatternExp(exp).match(this, {})
  }

  matchOrFail(exp: PatternExp): Record<string, Sexp> {
    return evaluatePatternExp(exp).matchOrFail(this, {})
  }
}
