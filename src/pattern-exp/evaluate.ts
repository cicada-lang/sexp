import { InternalError } from "../errors"
import { Pattern } from "../pattern"
import { ConsExp, ListExp, PatternExp, StrExp, VarExp } from "../pattern-exp"
import * as Patterns from "../patterns"

export function evaluate(exp: PatternExp): Pattern {
  if (typeof exp === "number") {
    return new Patterns.NumPattern(exp)
  }

  if (typeof exp === "string") {
    return new Patterns.SymPattern(exp)
  }

  if (exp instanceof Array) {
    let pattern = new Patterns.NullPattern()

    for (const head of [...exp].reverse()) {
      pattern = new Patterns.ConsPattern(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof ListExp) {
    let pattern = exp.end ? evaluate(exp.end) : new Patterns.NullPattern()

    for (const head of [...exp.exps].reverse()) {
      pattern = new Patterns.ConsPattern(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp instanceof StrExp) {
    return new Patterns.StrPattern(exp.value)
  }
  if (exp instanceof VarExp) {
    return new Patterns.VarPattern(exp.name)
  }

  if (exp instanceof ConsExp) {
    return new Patterns.ConsPattern(evaluate(exp.head), evaluate(exp.tail))
  }

  throw new InternalError(`Unknown pattern exp: ${exp}`)
}
