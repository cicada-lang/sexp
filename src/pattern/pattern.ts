import { Sexp } from "../sexp"

export abstract class Pattern {
  abstract matchOrFail(sexp: Sexp): Record<string, Sexp>

  match(sexp: Sexp): Record<string, Sexp> | undefined {
    try {
      return this.matchOrFail(sexp)
    } catch (_error) {
      return undefined
    }
  }
}

export class SymbolPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}

export class NumberPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}

export class StringPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}

export class ConsPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}

export class NullPattern extends Pattern {
  matchOrFail(sexp: Sexp): Record<string, Sexp> {
    throw new Error()
  }
}
