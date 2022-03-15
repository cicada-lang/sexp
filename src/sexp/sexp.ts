import { evaluate, PatternExp } from "../pattern-exp"
import { Span } from "../token"

export abstract class Sexp {
  abstract span: Span

  match(exp: PatternExp): Record<string, Sexp> | undefined {
    return evaluate(exp).match(this, {})
  }

  matchOrFail(exp: PatternExp): Record<string, Sexp> {
    return evaluate(exp).matchOrFail(this, {})
  }
}
