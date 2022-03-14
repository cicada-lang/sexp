import { Span } from "../token"

export type TokenKind =
  | "ParenthesisStart"
  | "ParenthesisEnd"
  | "Quote"
  | "Symbol"
  | "String"
  | "Number"

export class Token {
  kind: TokenKind
  value: string
  span: Span

  constructor(options: { kind: TokenKind; value: string; span: Span }) {
    this.kind = options.kind
    this.value = options.value
    this.span = options.span
  }
}
