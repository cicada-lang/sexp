import { Span } from "../span"

export class ParsingError extends Error {
  constructor(message: string, public span: Span) {
    super(message)
  }
}
