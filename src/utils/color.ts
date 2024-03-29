import picocolors from "picocolors"

export type ColorMode = "escape-code" | "html"

export function color(
  text: string,
  opts: {
    mode: ColorMode
    color?: string
    background?: string
  },
): string {
  switch (opts.mode) {
    case "escape-code": {
      if (opts.color === "red") text = picocolors.bold(picocolors.red(text))
      if (opts.background === "red") text = picocolors.bgRed(text)
      return text
    }
    case "html": {
      if (opts.color === "red")
        text = `<span style="color: red;">${text}</span>`
      if (opts.background === "red")
        text = `<span style="background: red;">${text}</span>`
      return text
    }
    default: {
      console.log(`[ut.color] unknown mode: ${opts.mode}`)
      return text
    }
  }
}
