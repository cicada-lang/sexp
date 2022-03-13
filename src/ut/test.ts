import { colors } from "./colors"

export async function test(
  description: string,
  fn: () => Promise<void>
): Promise<void> {
  await fn()
    .then(() => {
      const head = colors.blue("Ok")
      console.log(`${head}: ${description}`)
    })
    .catch((error) => {
      const head = colors.red("Fail")
      console.error(`${head}: ${description}`)
      console.error(error)
      throw error
    })
}
