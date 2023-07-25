import { describe, expect, test } from "@jest/globals";
import { questionConfig, configProject } from "../libs/config.mjs";

describe("test questionConfig", async () => {
  test("the data is peanut butter", async () => {
    const data = await questionConfig();
    expect(data).toBe("peanut butter");
  });
});
