export class Position {
  index: number
  row: number
  column: number

  constructor(opts: { index: number; row: number; column: number }) {
    this.index = opts.index
    this.row = opts.row
    this.column = opts.column
  }

  static init(): Position {
    return new Position({ index: 0, row: 0, column: 0 })
  }
}
