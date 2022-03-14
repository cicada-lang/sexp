import Path from "path"
import readdirp from "readdirp"
import { TestCase } from "../infra/test-case"
import { test } from "../utilities/test"

const ROOT = Path.resolve(__dirname, "..")

test("run all test cases", async () => {
  for (const { path } of await readdirp.promise(ROOT)) {
    if (path.endsWith("test.js")) {
      await runTestCase(path)
    }
  }
})

async function runTestCase(path: string): Promise<void> {
  const testModule = require(Path.resolve(ROOT, path))

  if (!testModule.default) return
  if (!isSubclassOf(testModule.default, TestCase)) return

  const testCase = new testModule.default()

  const names = Object.getOwnPropertyNames(Object.getPrototypeOf(testCase))

  for (const name of names) {
    if (name.startsWith("test")) {
      console.log({ path, message: name })
      const action = testCase[name]
      action.bind(testCase)
    }
  }
}

function isSubclassOf(x: any, y: any): boolean {
  return x.prototype instanceof y
}
