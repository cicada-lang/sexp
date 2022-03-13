import { assertEqual } from "./assertions"
import { slug } from "./slug"

const target = "構造-the-constructivization-of-mathematics"

// prettier-ignore

{
  assertEqual(target, slug("構造 / The constructivization of mathematics"))
  assertEqual(target, slug("[構造] / The constructivization of mathematics---"))
  assertEqual(target, slug("---[構造] / The constructivization of mathematics---"))
  assertEqual(target, slug("---「構造」 / The constructivization of mathematics---"))
  assertEqual(target, slug("---「構造」 / The constructivization of mathematics___"))
  assertEqual(target, slug("---「構造」 / The_constructivization_of_mathematics___"))
}
