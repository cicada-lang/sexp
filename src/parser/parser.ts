import { Lexer } from "../lexer"
import { Sexp } from "../sexp"
import { Parsing } from "./parsing"
import { ParserConfig } from "../parser"

export class Parser {
  lexer: Lexer
  config: ParserConfig

  constructor(options: { lexer: Lexer }) {
    this.lexer = options.lexer
    this.config = this.lexer.config
  }

  parse(text: string): Sexp {
    const tokens = this.lexer.lex(text)
    const parsing = new Parsing(tokens)
    return parsing.parse()
  }
}
