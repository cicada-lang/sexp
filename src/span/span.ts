export interface Position {
  index: number
  row: number
  column: number
}

export class Span {
  constructor(public start: Position, public end: Position) {}
}
