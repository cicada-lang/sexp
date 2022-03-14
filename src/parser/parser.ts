import { Lexer } from "../lexer"
import { ParserConfig } from "../parser"
import { Sexp } from "../sexp"
import { Parsing } from "./parsing"

export class Parser {
  lexer: Lexer
  config: ParserConfig

  constructor(options: { lexer: Lexer }) {
    this.lexer = options.lexer
    this.config = this.lexer.config
  }

  parse(text: string): Sexp {
    const tokens = this.lexer.lex(text)
    const parsing = new Parsing(this, tokens)
    return parsing.parse()
  }
}
