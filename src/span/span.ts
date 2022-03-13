export class Span {
  hi: number
  lo: number
  row: number
  col: number

  constructor(opts: { hi: number; lo: number; row: number; col: number }) {
    this.hi = opts.hi
    this.lo = opts.lo
    this.row = opts.row
    this.col = opts.col
  }
}
