import { describe, it, expect } from "vitest";
import { fake } from "../../src/index";

describe("basic usage examples", () => {
  it("should create a simple user fake", () => {
    interface User {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }

    const testUser = fake<User>({
      id: 1,
      name: "John Doe",
    });

    expect(testUser.id).toBe(1);
    expect(testUser.name).toBe("John Doe");
  });

  it("should create nested customer fake", () => {
    interface Address {
      street: string;
      city: string;
      country: string;
    }

    interface Customer {
      id: string;
      name: string;
      address: Address;
    }

    const testCustomer = fake<Customer>({
      id: "cust-123",
      name: "Jane Smith",
      address: fake<Address>({
        city: "New York",
      }),
    });

    expect(testCustomer.id).toBe("cust-123");
    expect(testCustomer.name).toBe("Jane Smith");
    expect(testCustomer.address.city).toBe("New York");
  });

  it("should create order fake with array of products", () => {
    interface Product {
      id: string;
      name: string;
      price: number;
    }

    interface Order {
      orderId: string;
      items: Product[];
      total: number;
    }

    const testOrder = fake<Order>({
      orderId: "order-456",
      items: [
        fake<Product>({ id: "prod-1", name: "Widget" }),
        fake<Product>({ id: "prod-2", name: "Gadget" }),
      ],
    });

    expect(testOrder.orderId).toBe("order-456");
    expect(testOrder.items).toHaveLength(2);
    expect(testOrder.items[0].id).toBe("prod-1");
    expect(testOrder.items[0].name).toBe("Widget");
    expect(testOrder.items[1].id).toBe("prod-2");
    expect(testOrder.items[1].name).toBe("Gadget");
  });
});
