import { ParsingError } from "../errors/index.js"
import type { PatternExp } from "../pattern-exp/index.js"
import { evaluate } from "../pattern-exp/index.js"
import type { Pattern } from "../pattern/index.js"
import { formatPattern, matchPattern } from "../pattern/index.js"
import type { Sexp } from "../sexp/index.js"
import { formatSexp } from "../sexp/index.js"
import { Span } from "../span/index.js"

export function matchSymbol(sexp: Sexp): string {
  if (sexp.kind !== "Sym") {
    throw new ParsingError(
      `I expect the sexp to be a symbol: ${formatSexp(sexp)}`,
      sexp.span,
    )
  }

  return sexp.value
}

export function matchString(sexp: Sexp): string {
  if (sexp.kind !== "Str") {
    throw new ParsingError(
      `I expect the sexp to be a string: ${formatSexp(sexp)}`,
      sexp.span,
    )
  }

  return sexp.value
}

export function matchNumber(sexp: Sexp): number {
  if (sexp.kind !== "Num") {
    throw new ParsingError(
      `I expect the sexp to be a number: ${formatSexp(sexp)}`,
      sexp.span,
    )
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

  throw new ParsingError(
    `I expect the sexp to be a list: ${formatSexp(sexp)}`,
    sexp.span,
  )
}

export type Rule<A> = [
  PatternExp,
  (results: Record<string, Sexp>, options: { span: Span }) => A,
]

export function match<A>(sexp: Sexp, rules: Array<Rule<A>>): A {
  const patterns: Array<Pattern> = []
  for (const [patternExp, f] of rules) {
    const pattern = evaluate(patternExp)
    patterns.push(pattern)
    const results = matchPattern(pattern, sexp)
    if (results !== undefined) {
      return f(results, { span: sexp.span })
    }
  }

  const formatedPatterns = patterns
    .map(formatPattern)
    .map((s) => "  " + s)
    .join("\n")

  const message = [
    `Fail to match sexp: ${formatSexp(sexp)}`,
    `Patterns:`,
    `${formatedPatterns}`,
  ]

  throw new ParsingError(message.join("\n"), sexp.span)
}
