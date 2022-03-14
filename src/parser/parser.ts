import { Lexer } from "../lexer"
import { Sexp } from "../sexp"
import { Parsing } from "./parsing"

export class Parser {
  lexer: Lexer

  constructor(opts: { lexer: Lexer }) {
    this.lexer = opts.lexer
  }

  parse(text: string): Sexp {
    const tokens = this.lexer.lex(text)
    const parsing = new Parsing(tokens)
    return parsing.parse()
  }
}
