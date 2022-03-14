import { Span } from "../token"

export type TokenKind =
  | "ParenthesisStart"
  | "ParenthesisEnd"
  | "Quote"
  | "Comment"
  | "Symbol"
  | "String"
  | "Number"

export class Token {
  kind: TokenKind
  value: string
  span: Span

  constructor(opts: { kind: TokenKind; value: string; span: Span }) {
    this.kind = opts.kind
    this.value = opts.value
    this.span = opts.span
  }
}
