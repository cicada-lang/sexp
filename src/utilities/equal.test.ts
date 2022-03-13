import { assertEqual, assertNotEqual } from "./assertions"

{
  const x = [1, 2, new Set([1, 2, [1, 2, 3]])]
  const y = [1, 2, new Set([1, 2, [1, 2, 3]])]
  assertEqual(x, y)
}

{
  const x = new Map().set("a", "a").set("b", "b").set("c", "c")
  const y = new Map().set("c", "c").set("b", "b").set("a", "a")
  assertEqual(x, y)
}

{
  const x = [1, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  const y = [1, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  assertEqual(x, y)
}

{
  const f = (x: number) => `x: ${x}`
  const x = [f, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  const y = [f, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  assertEqual(x, y)
}

{
  const f = (x: number) => (y: number) => `x: ${x}, y: ${y}`
  const x = f(1)
  const y = f(1)
  assertNotEqual(x, y)
}
