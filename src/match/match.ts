import { ParsingError } from "../errors"
import { matchPattern } from "../pattern"
import { evaluate, PatternExp } from "../pattern-exp"
import { Sexp } from "../sexp"
import { Span } from "../span"

export function matchSymbol(sexp: Sexp): string {
  if (sexp.kind !== "Sym") {
    throw new ParsingError(`I expect the sexp to be a symbol.`, sexp.span)
  }

  return sexp.value
}

export function matchString(sexp: Sexp): string {
  if (sexp.kind !== "Str") {
    throw new ParsingError(`I expect the sexp to be a string.`, sexp.span)
  }

  return sexp.value
}

export function matchNumber(sexp: Sexp): number {
  if (sexp.kind !== "Num") {
    throw new ParsingError(`I expect the sexp to be a number.`, sexp.span)
  }

  return sexp.value
}

export function matchList<A>(sexp: Sexp, matcher: (sexp: Sexp) => A): Array<A> {
  if (sexp.kind === "Null") {
    return []
  }

  if (sexp.kind === "Cons") {
    return [matcher(sexp.head), ...matchList(sexp.tail, matcher)]
  }

  throw new ParsingError(`I expect the sexp to be a list.`, sexp.span)
}

export type Rule<A> = [
  PatternExp,
  (results: Record<string, Sexp>, options: { span: Span }) => A,
]

export function match<A>(sexp: Sexp, rules: Array<Rule<A>>): A {
  for (const [pattern, f] of rules) {
    const results = matchPattern(evaluate(pattern), sexp)
    if (results !== undefined) return f(results, { span: sexp.span })
  }

  throw new ParsingError("Pattern mismatch.", sexp.span)
}
