import { List } from "../sexps"
import { Span } from "../span"

export class Null extends List {
  constructor(public span: Span) {
    super()
  }
}
