import { InternalError } from "../errors"
import { Pattern } from "../pattern"
import * as Patterns from "../patterns"
import { ConsExp, ListExp, PatternExp, StrExp } from "./pattern-exp"

export function evaluatePatternExp(exp: PatternExp): Pattern {
  if (typeof exp === "number") {
    return new Patterns.NumPattern(exp)
  }

  if (typeof exp === "string") {
    return new Patterns.SymPattern(exp)
  }

  if (exp instanceof Array) {
    let pattern = new Patterns.NullPattern()

    for (const head of [...exp].reverse()) {
      pattern = new Patterns.ConsPattern(evaluatePatternExp(head), pattern)
    }

    return pattern
  }

  if (exp instanceof ListExp) {
    let pattern = exp.end
      ? evaluatePatternExp(exp.end)
      : new Patterns.NullPattern()

    for (const head of [...exp.exps].reverse()) {
      pattern = new Patterns.ConsPattern(evaluatePatternExp(head), pattern)
    }

    return pattern
  }

  if (exp instanceof StrExp) {
    return new Patterns.StrPattern(exp.value)
  }

  if (exp instanceof ConsExp) {
    return new Patterns.ConsPattern(
      evaluatePatternExp(exp.head),
      evaluatePatternExp(exp.tail)
    )
  }

  throw new InternalError(`Unknown pattern exp: ${exp}`)
}
