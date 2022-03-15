import { Position } from "../token"

export class Span {
  constructor(public start: Position, public end: Position) {}

  union(that: Span): Span {
    const start = this.start.index < that.start.index ? this.start : that.start
    const end = this.end.index > that.end.index ? this.end : that.end
    return new Span(start, end)
  }
}
