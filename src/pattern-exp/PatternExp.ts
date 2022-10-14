export type PatternExp =
  | string
  | number
  | StrExp
  | ConsExp
  | ListExp
  | Array<PatternExp>
  | VarExp

export class StrExp {
  constructor(public value: string) {}
}

export class ConsExp {
  constructor(public head: PatternExp, public tail: PatternExp) {}
}

export class ListExp {
  constructor(public exps: Array<PatternExp>, public end?: PatternExp) {}
}

export class VarExp {
  constructor(public name: string) {}
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

export function v(name: string): VarExp {
  return new VarExp(name)
}
