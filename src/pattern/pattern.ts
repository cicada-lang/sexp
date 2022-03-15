import { Sexp } from "../sexp"

export class PatternMatchResult {}

export abstract class Pattern {
  abstract match(sexp: Sexp): PatternMatchResult

  test(sexp: Sexp): boolean {
    throw new Error()
  }
}

export class SymbolPattern {
  //
}

export class NumberPattern {
  //
}

export class StringPattern {
  //
}

export class ConsPattern {
  //
}

export class NullPattern {
  //
}
