import { expect, test } from "vitest"
import { slug } from "./slug"

const target = "構造-the-constructivization-of-mathematics"

// prettier-ignore
test("slug", () => {
  expect(target).toEqual(slug("構造 / The constructivization of mathematics"))
  expect(target).toEqual(slug("[構造] / The constructivization of mathematics---"))
  expect(target).toEqual(slug("---[構造] / The constructivization of mathematics---"))
  expect(target).toEqual(slug("---「構造」 / The constructivization of mathematics---"))
  expect(target).toEqual(slug("---「構造」 / The constructivization of mathematics___"))
  expect(target).toEqual(slug("---「構造」 / The_constructivization_of_mathematics___"))
})
