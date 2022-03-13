export class Span {
  start: number
  end: number
  row: number
  column: number

  constructor(opts: {
    start: number
    end: number
    row: number
    column: number
  }) {
    this.start = opts.start
    this.end = opts.end
    this.row = opts.row
    this.column = opts.column
  }
}
