export type Pattern = Var | Cons | Null | Num | Str | Sym

export type Var = {
  family: "Pattern"
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    family: "Pattern",
    kind: "Var",
    name,
  }
}

export type Null = {
  family: "Pattern"
  kind: "Null"
}

export function Null(): Null {
  return {
    family: "Pattern",
    kind: "Null",
  }
}

export type Cons = {
  family: "Pattern"
  kind: "Cons"
  head: Pattern
  tail: Pattern
}

export function Cons(head: Pattern, tail: Pattern): Cons {
  return {
    family: "Pattern",
    kind: "Cons",
    head,
    tail,
  }
}

export type Num = {
  family: "Pattern"
  kind: "Num"
  value: number
}

export function Num(value: number): Num {
  return {
    family: "Pattern",
    kind: "Num",
    value,
  }
}

export type Str = {
  family: "Pattern"
  kind: "Str"
  value: string
}

export function Str(value: string): Str {
  return {
    family: "Pattern",
    kind: "Str",
    value,
  }
}

export type Sym = {
  family: "Pattern"
  kind: "Sym"
  value: string
}

export function Sym(value: string): Sym {
  return {
    family: "Pattern",
    kind: "Sym",
    value,
  }
}
