export interface ParserOptions {
  quotes: Array<{ mark: string; symbol: string }>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
  nulls: Array<string>
}

export class ParserConfig {
  quotes: Array<{ mark: string; symbol: string }>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
  nulls: Array<string>

  marks: Array<string>

  constructor(options: ParserOptions) {
    this.quotes = options.quotes
    this.parentheses = options.parentheses
    this.comments = options.comments
    this.nulls = options.nulls

    this.marks = [
      ...options.quotes.map(({ mark }) => mark),
      ...options.parentheses.flatMap(({ start, end }) => [start, end]),
    ]
  }
}
