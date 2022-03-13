import { Token } from "../token"
import { Lexing } from "./lexing"

export interface LexerConfig {
  quotes: Array<{ mark: string; symbol: string }>
  parentheses: Array<{ start: string; end: string }>
  comments: Array<string>
}

export class Lexer {
  marks: Array<string>

  constructor(public config: LexerConfig) {
    this.marks = createMarks(config)
  }

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(this, text))
  }
}

function createMarks(config: LexerConfig): Array<string> {
  return [
    ...config.quotes.map(({ mark }) => mark),
    ...config.parentheses.flatMap(({ start, end }) => [start, end]),
  ]
}
