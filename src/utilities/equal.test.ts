import { assertEquals, assertNotEquals } from "./assertions"

{
  const x = [1, 2, new Set([1, 2, [1, 2, 3]])]
  const y = [1, 2, new Set([1, 2, [1, 2, 3]])]
  assertEquals(x, y)
}

{
  const x = new Map().set("a", "a").set("b", "b").set("c", "c")
  const y = new Map().set("c", "c").set("b", "b").set("a", "a")
  assertEquals(x, y)
}

{
  const x = [1, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  const y = [1, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  assertEquals(x, y)
}

{
  const f = (x: number) => `x: ${x}`
  const x = [f, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  const y = [f, { x: "x", y: "y" }, new Set([1, 2, [1, 2, { x: "x", y: "y" }]])]
  assertEquals(x, y)
}

{
  const f = (x: number) => (y: number) => `x: ${x}, y: ${y}`
  const x = f(1)
  const y = f(1)
  assertNotEquals(x, y)
}
