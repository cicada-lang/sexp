import { assertEquals } from "./assertions"
import { slug } from "./slug"

const target = "構造-the-constructivization-of-mathematics"

// prettier-ignore

{
  assertEquals(target, slug("構造 / The constructivization of mathematics"))
  assertEquals(target, slug("[構造] / The constructivization of mathematics---"))
  assertEquals(target, slug("---[構造] / The constructivization of mathematics---"))
  assertEquals(target, slug("---「構造」 / The constructivization of mathematics---"))
  assertEquals(target, slug("---「構造」 / The constructivization of mathematics___"))
  assertEquals(target, slug("---「構造」 / The_constructivization_of_mathematics___"))
}
