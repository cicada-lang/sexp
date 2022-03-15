import { PatternExp } from "../pattern-exp"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"

export function matchSymbol(sexp: Sexp): string {
  if (!(sexp instanceof Sexps.Sym)) {
    throw new Error(`I expect the sexp to be a symbol.`)
  }

  return sexp.value
}

export function matchString(sexp: Sexp): string {
  if (!(sexp instanceof Sexps.Str)) {
    throw new Error(`I expect the sexp to be a string.`)
  }

  return sexp.value
}

export function matchNumber(sexp: Sexp): number {
  if (!(sexp instanceof Sexps.Num)) {
    throw new Error(`I expect the sexp to be a number.`)
  }

  return sexp.value
}

export function matchList<A>(sexp: Sexp, matcher: (sexp: Sexp) => A): Array<A> {
  if (sexp instanceof Sexps.Null) {
    return []
  }

  if (sexp instanceof Sexps.Cons) {
    return [matcher(sexp.head), ...matchList(sexp.tail, matcher)]
  }

  throw new Error(`I expect the sexp to be a list.`)
}

export function match<A>(
  sexp: Sexp,
  entries: Array<[PatternExp, (results: Record<string, Sexp>) => A]>
): A {
  for (const [pattern, f] of entries) {
    const results = sexp.match(pattern)
    if (results !== undefined) return f(results)
  }

  throw new Error("Pattern mismatch.")
}