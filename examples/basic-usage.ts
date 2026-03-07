import { fake } from "../src/index";

// Example: Basic usage with a simple interface
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

console.log("Basic fake:", testUser);

// Example: Nested objects
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

console.log("Nested fake:", testCustomer);

// Example: Arrays
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

console.log("Array fake:", testOrder);
