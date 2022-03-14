import { ParserConfig, ParserOptions } from "../parser"
import { Token } from "../token"
import { Lexing } from "./lexing"

export class Lexer {
  config: ParserConfig

  constructor(public options: ParserOptions) {
    this.config = new ParserConfig(options)
  }

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(this, text))
  }
}
