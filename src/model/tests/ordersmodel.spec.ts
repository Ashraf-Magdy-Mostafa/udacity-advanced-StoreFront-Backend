import ordersStore from "../orders";
const Store = new ordersStore();

describe("required ORDER function exists", () => {
  it("ceate order", async () => {
    expect(Store.create).toBeDefined();
  });
  it("delete order", async () => {
    expect(Store.delete).toBeDefined();
  });
  it("get order by id", async () => {
    expect(Store.getorder).toBeDefined();
  });
  it("get all orders", async () => {
    expect(Store.index).toBeDefined();
  });
  it("create new product order", async () => {
    expect(Store.neworder).toBeDefined();
  });
  it("get product order by user_id", async () => {
    expect(Store.show).toBeDefined();
  });
});
