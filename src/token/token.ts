import { Span } from "../span"

export class Token {
  constructor(public kind: string, public value: string, public span: Span) {}
}
