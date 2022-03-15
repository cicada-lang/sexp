export type PatternExp =
  | string
  | number
  | StrExp
  | ConsExp
  | ListExp
  | Array<PatternExp>

class StrExp {
  constructor(public value: string) {}
}

class ConsExp {
  constructor(public head: PatternExp, public tail: PatternExp) {}
}

class ListExp {
  constructor(public list: Array<PatternExp>, public end?: PatternExp) {}
}

export function str(value: string): StrExp {
  return new StrExp(value)
}

export function cons(head: PatternExp, tail: PatternExp): ConsExp {
  return new ConsExp(head, tail)
}

export function list(list: Array<PatternExp>, end?: PatternExp): ListExp {
  return new ListExp(list, end)
}
