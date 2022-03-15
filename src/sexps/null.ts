import { List } from "../sexps"
import { Span } from "../token"

export class Null extends List {
  constructor(public span: Span) {
    super()
  }
}
