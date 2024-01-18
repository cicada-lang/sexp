# S-expression

> Syntax without representation is tyranny.
>
> -- Sussman's mantra

An implementation of [S-expression](https://en.wikipedia.org/wiki/S-expression) in JavaScript.

## Installation

```
npm i @cicada-lang/sexp
```

## Examples

Parsing lambda calculus expressions:

```
<exp> = <variable>
      | (lambda (<name> ...) <exp>)
      | (<exp> <exp> ...)
```

Example from from [**@cicada-lang/lambda.sexp**](https://github.com/cicada-lang/lambda.sexp):

- See [**src/lang/parser/**](https://github.com/cicada-lang/lambda.sexp/tree/master/src/lang/parser) for the complete example.

```typescript
import { cons, match, matchList, matchSymbol, Sexp, v } from "@cicada-lang/sexp"
import { Exp } from "../exp"
import * as Exps from "../exps"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchSymbol).reduceRight(
          (fn, name) => new Exps.Fn(name, fn),
          matchExp(exp),
        ),
    ],
    [
      cons(v("target"), v("args")),
      ({ target, args }) =>
        matchList(args, matchExp).reduce(
          (result, arg) => new Exps.Ap(result, arg),
          matchExp(target),
        ),
    ],
    [v("name"), ({ name }) => new Exps.Var(matchSymbol(name))],
  ])
}
```

## Development

```sh
npm install      # Install dependencies
npm run build    # Compile `src/` to `lib/`
npm run format   # Format the code
npm run test     # Run test
```

## Contributions

To make a contribution,
[fork this project](https://github.com/cicada-lang/cicada/fork)
and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
