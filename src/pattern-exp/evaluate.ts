import { InternalError } from "../errors"
import { Pattern } from "../pattern"
import { ConsExp, ListExp, PatternExp, StrExp, VarExp } from "../pattern-exp"
import * as Patterns from "../patterns"

export function evaluate(exp: PatternExp): Pattern {
  if (typeof exp === "number") {
    return new Patterns.Num(exp)
  }

  if (typeof exp === "string") {
    return new Patterns.Sym(exp)
  }

  if (exp instanceof Array) {
    let pattern = new Patterns.Null()

    for (const head of [...exp].reverse()) {
      pattern = new Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof ListExp) {
    let pattern = exp.end ? evaluate(exp.end) : new Patterns.Null()

    for (const head of [...exp.exps].reverse()) {
      pattern = new Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof StrExp) {
    return new Patterns.Str(exp.value)
  }
  if (exp instanceof VarExp) {
    return new Patterns.Var(exp.name)
  }

  if (exp instanceof ConsExp) {
    return new Patterns.Cons(evaluate(exp.head), evaluate(exp.tail))
  }

  throw new InternalError(`Unknown pattern exp: ${exp}`)
}
