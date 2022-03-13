- `Lexer.lex` -- setup tests

- `Lexer.lex` -- handle `parentheses` -- single char only
- `Lexer.lex` -- handle `quotes` -- expend `'(1 2 3)` to `(quote (1 2 3))`

- `Lexer.lex` -- handle number -- use json number
- `Lexer.lex` -- handle double quoted string -- use json string

- `Lexer.lex` -- handle `comments` -- be able to use `//` and `;`

- `Parser.parseTokens`

- `Matcher.match<A>(sexp: Sexp): A` -- composable

  - API for shallow embedding -- use `SymbolArray` -- handle cons
