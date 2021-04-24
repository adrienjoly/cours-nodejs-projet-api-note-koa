const fetch = require("node-fetch");
const assert = require("assert");

describe("test the PATCH rout", () => {
  it("Should work", async () => {
    const randomBodyContent = Math.floor(Math.random() * 10000).toString();
    const rawResponse = await fetch(
      "localhost:3000/notes/6080722285217938b037333e",
      {
        method: "PATCH",
        body: { content: randomBodyContent },
      }
    );
    rawResponse = rawResponse.json();
    assert.strictEqual(rawResponse.content, "randomBodyContent");
    // assert.strictEqual(1,2)
  });
});
