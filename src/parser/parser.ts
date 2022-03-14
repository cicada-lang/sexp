import { ParsingError } from "../errors"
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
    const parsing = new Parsing(this)
    const { sexp, remain } = parsing.parse(tokens)
    if (remain.length !== 0) {
      throw new ParsingError(
        `I expect to consume all the tokens, but there are ${remain.length} tokens remain.`,
        remain[0].span
      )
    }

    return sexp
  }
}
