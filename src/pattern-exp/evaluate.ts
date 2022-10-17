import { InternalError } from "../errors"
import * as Patterns from "../pattern"
import { Pattern } from "../pattern"
import { ConsExp, ListExp, PatternExp, StrExp, VarExp } from "../pattern-exp"

export function evaluate(exp: PatternExp): Pattern {
  if (typeof exp === "number") {
    return Patterns.Num(exp)
  }

  if (typeof exp === "string") {
    return Patterns.Sym(exp)
  }

  if (exp instanceof Array) {
    let pattern: Pattern = Patterns.Null()

    for (const head of [...exp].reverse()) {
      pattern = Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof ListExp) {
    let pattern = exp.end ? evaluate(exp.end) : Patterns.Null()

    for (const head of [...exp.exps].reverse()) {
      pattern = Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof StrExp) {
    return Patterns.Str(exp.value)
  }
  if (exp instanceof VarExp) {
    return Patterns.Var(exp.name)
  }

  if (exp instanceof ConsExp) {
    return Patterns.Cons(evaluate(exp.head), evaluate(exp.tail))
  }

  throw new InternalError(`Unknown pattern exp: ${exp}`)
}
