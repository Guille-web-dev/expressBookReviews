const http = require("../query/query");

describe("Get request on endpoint be using axios", () => {
  test("should get all books", async () => {
    const Http = new http();
    const response = await Http.getRequest();
    console.log(response.data.body, "statusCode:"+response.data.status)
    expect(typeof response).toBe("object");
  });
  test("should get a book by isbn", async () => {
    const Http = new http();
    const response = await Http.isbnGetRequest(1);
    console.log(response.data.body, "statusCode:"+response.data.status)
    expect(typeof response).toBe("object");
  });
  test("should get a book by author", async () => {
    const Http = new http();
    const response = await Http.authorGetRequest("ChinuaAchebe");
    console.log(response.data.body, "statusCode:"+response.data.status)
    expect(typeof response).toBe("object");
  });
  test("should get a book by title", async () => {
    const Http = new http();
    const response = await Http.titleGetRequest("Fairy-tales");
    console.log(response.data.body, "statusCode:"+response.data.status)
    expect(typeof response).toBe("object");
  });
});
