- Atom > Sym Str Num
- TokenKind -- Parenthesis Quote Comment Symbol String Number


- `Lexer.lex` -- handle symbol -- use `marks` -- single char only
- `Lexer.lex` -- handle number -- use json number
- `Lexer.lex` -- handle string -- use json string

- `Lexer.lex` -- setup tests

- `Lexer.lex` -- handle `parentheses` -- single char  only
- `Lexer.lex` -- handle double quoted string
- `Lexer.lex` -- handle `quotes` -- expend `'(1 2 3)` to `(quote (1 2 3))`
- `Lexer.lex` -- handle `comments` -- be able to use `//` and `;`

- `Parser.parseTokens`

- API for shallow embedding

- `Matcher.match<A>(sexp: Sexp): A` -- composable

- `Sexp.toArray(): SymbolArray`
