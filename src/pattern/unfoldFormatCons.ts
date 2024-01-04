import type { Pattern } from "../pattern/index.js"
import { formatPattern } from "../pattern/index.js"

export function unfoldFormatCons(pattern: Pattern): {
  heads: Array<string>
  tail?: string
} {
  switch (pattern.kind) {
    case "Cons": {
      const head = formatPattern(pattern.head)
      const { heads, tail } = unfoldFormatCons(pattern.tail)
      return { heads: [head, ...heads], tail }
    }

    case "Null": {
      return { heads: [], tail: undefined }
    }

    default: {
      return { heads: [], tail: formatPattern(pattern) }
    }
  }
}
