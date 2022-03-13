import { Span } from "../span"

export abstract class Sexp {
  abstract span?: Span
  // abstract toArray(): SymbolArray
}

export type SymbolArray = string | Array<SymbolArray>
