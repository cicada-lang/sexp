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

Parsing lambda:

```scheme
(lambda (<name> ...) <exp>)
```

Example from from [**@cicada-lang/lambda.sexp**](https://github.com/cicada-lang/lambda.sexp):

- See [**src/lang/parser/**](https://github.com/cicada-lang/lambda.sexp/tree/master/src/lang/parser) for the complete example.

```typescript
import { matchList, matchSymbol, Rule, v } from "@cicada-lang/sexp"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { matchExp } from "../matchExp"

export function matchFn(): Array<Rule<Exp>> {
  return [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchSymbol).reduceRight(
          (fn, name) => new Exps.Fn(name, fn),
          matchExp(exp),
        ),
    ],
  ]
}
```

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

It is assumed that all non draft PRs are ready to be merged.
If your PR is not ready to be merged yet, please make it a draft PR:

- [Creating draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests)
- [Changing a PR to draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request)

During the development of your PR, you can make use of
the [TODO.md](TODO.md) file to record ideas temporarily,
and this file should be clean again at the end of your development.

## License

[GPLv3](LICENSE)
