export class Position {
  index: number
  column: number
  row: number

  constructor(opts: { index: number; column: number; row: number }) {
    this.index = opts.index
    this.column = opts.column
    this.row = opts.row
  }

  static init(): Position {
    return new Position({ index: 0, column: 0, row: 0 })
  }

  step(char: string): void {
    if (char.length !== 1) {
      throw new Error(`I Expect the char to be length of one: ${char}`)
    }

    this.index++

    if (char === "\n") {
      this.column = 0
      this.row++
    } else {
      this.column++
    }
  }
}
