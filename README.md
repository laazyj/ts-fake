# ts-fake

[![npm version](https://img.shields.io/npm/v/ts-fake.svg)](https://www.npmjs.com/package/ts-fake)
[![npm downloads](https://img.shields.io/npm/dm/ts-fake.svg)](https://www.npmjs.com/package/ts-fake)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/laazyj/ts-fake/workflows/CI/badge.svg)](https://github.com/laazyj/ts-fake/actions)
[![Coverage](https://codecov.io/gh/laazyj/ts-fake/branch/main/graph/badge.svg)](https://codecov.io/gh/laazyj/ts-fake)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ts-fake)](https://bundlephobia.com/package/ts-fake)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

Type-safe test utility for creating fakes of TypeScript interfaces and objects in unit tests.

## Installation

```bash
npm install --save-dev ts-fake
```

## Quick Start

```typescript
import { fake } from "ts-fake";

interface User {
  id: number;
  name: string;
  email: string;
}

// Create a type-safe fake with only the properties you need
const fakeUser = fake<User>({
  id: 1,
  name: "Test User",
});

// Use in your tests - email is undefined but type-safe
expect(fakeUser.id).toBe(1);
expect(fakeUser.name).toBe("Test User");
```

## Features

- **Type-safe**: Full TypeScript support with compile-time type checking
- **Deep partial support**: Nested objects work seamlessly
- **Minimal boilerplate**: Only specify the properties you need for your test
- **Zero dependencies**: Lightweight and fast
- **Framework agnostic**: Works with any testing framework (Jest, Vitest, Mocha, etc.)

## Usage

### Basic Example

```typescript
import { fake } from "ts-fake";

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

// Only provide the fields you need for your test
const testProduct = fake<Product>({
  id: "test-123",
  name: "Test Product",
});

// Use in your tests
expect(testProduct.id).toBe("test-123");
```

### Nested Objects

```typescript
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

// Deep partial support - only specify what you need
const testCustomer = fake<Customer>({
  id: "cust-123",
  name: "Jane Smith",
  address: {
    city: "New York",
  },
});
```

### Advanced Usage

```typescript
// Arrays and complex structures
interface Product {
  id: string;
  name: string;
}

interface Order {
  id: string;
  user: User;
  items: Product[];
  total: number;
}

const testOrder = fake<Order>({
  id: "order-1",
  user: {
    id: 1,
    name: "Test User",
  },
  items: [
    { id: "prod-1", name: "Widget" },
    { id: "prod-2", name: "Gadget" },
  ],
});
```

## API Documentation

### `fake<T>(partial?: DeepPartial<T>): T`

Creates a type-safe fake object of type `T`.

**Parameters:**
- `partial` (optional): A deep partial object containing the properties you want to set. If omitted, returns an empty object typed as `T`.

**Returns:**
- A complete object of type `T` with the provided properties

**Type Safety:**
- TypeScript will enforce that all provided properties match the interface
- The returned object is typed as `T`, allowing it to be used anywhere `T` is expected
- Supports deep partial objects - you can partially specify nested properties

**Example:**
```typescript
// Empty fake
const emptyUser = fake<User>();

// Partial fake
const partialUser = fake<User>({ id: 1 });

// Deep partial fake
const customer = fake<Customer>({
  address: { city: "NYC" }, // Only city, not full Address
});
```

## Why Use ts-fake?

Creating test data in TypeScript often involves choosing between several imperfect approaches. `ts-fake` provides a better alternative.

### The Problem

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  roles: Role[];
}

// Your test only needs id and name
```

### Alternative Approaches (and their problems)

**1. Type Assertion via `unknown`: `{} as unknown as T`**
```typescript
const user = { id: 1, name: "Test" } as unknown as User;
```
❌ Bypasses all type checking - typos won't be caught  
❌ Can pass invalid properties without errors  
❌ No IDE autocomplete

**2. Using `Partial<T>` directly**
```typescript
const user: Partial<User> = { id: 1, name: "Test" };
doSomething(user); // ❌ Type error: Partial<User> is not assignable to User
```
❌ Can't pass to functions expecting `User`  
❌ Requires casting anyway: `user as User`  
❌ Loses type safety when casting

**3. Providing the full interface**
```typescript
const user: User = {
  id: 1,
  name: "Test",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  preferences: { theme: "dark", language: "en" },
  roles: [],
};
```
❌ Verbose and tedious  
❌ Brittle - breaks when interface changes  
❌ Obscures what the test actually needs

**4. Refactoring with Interface Segregation Principle (ISP)**
```typescript
interface UserIdentity {
  id: number;
  name: string;
}

function doSomething(user: UserIdentity) { ... }
```
❌ Not always practical - you don't control all interfaces  
❌ Over-engineering for test purposes  
❌ Doesn't help with third-party types

### The ts-fake Solution

```typescript
const user = fake<User>({ id: 1, name: "Test" });
doSomething(user); // ✅ Works perfectly
```

✅ **Type-safe**: Properties are validated against the interface  
✅ **Minimal**: Only specify what your test needs  
✅ **Flexible**: Works with any interface, including third-party types  
✅ **Maintainable**: Tests don't break when unused properties change  
✅ **Clear intent**: Shows exactly what the test depends on  
✅ **IDE support**: Full autocomplete and type checking

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © [laazyj](https://github.com/laazyj)
