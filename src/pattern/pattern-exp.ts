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
  constructor(public list: Array<PatternExp>, public tail: PatternExp) {}
}
