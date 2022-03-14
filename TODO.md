- [refactor] `handle` methods call `forward`

- `Lexer.lex` -- handle `row` and `column` in `Position`

- `Parser.parseTokens`

- `Parser.parse` -- handle `quotes` -- expend `'(1 2 3)` to `(quote (1 2 3))`

- `Matcher.match<A>(sexp: Sexp): A` -- composable

  - API for shallow embedding -- use `SymbolArray` -- handle cons

# after then

- use sexp to do a untyped lambda calculus
  to learn about how to implement equivalence
  between functions with recursion.

- use sexp to do a simple record type
  to learn about how to implement equivalence
  between recursive record and subtyping.
