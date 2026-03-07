import { describe, it, expect } from "vitest";
import { fake } from "../../src/index";

describe("fake", () => {
  describe("basic functionality", () => {
    it("should create an empty object when no partial is provided", () => {
      interface Empty {
        id: number;
        name: string;
      }

      const result = fake<Empty>();

      expect(result).toEqual({});
    });

    it("should create an object with provided properties", () => {
      interface User {
        id: number;
        name: string;
        email: string;
      }

      const result = fake<User>({ id: 1, name: "Test User" });

      expect(result).toEqual({ id: 1, name: "Test User" });
      expect(result.id).toBe(1);
      expect(result.name).toBe("Test User");
    });

    it("should handle all properties provided", () => {
      interface Simple {
        value: string;
      }

      const result = fake<Simple>({ value: "test" });

      expect(result.value).toBe("test");
    });
  });

  describe("nested objects", () => {
    it("should handle nested partial objects", () => {
      interface Address {
        street: string;
        city: string;
        country: string;
      }

      interface User {
        id: number;
        name: string;
        address: Address;
      }

      const result = fake<User>({
        id: 1,
        address: { city: "New York" },
      });

      expect(result.id).toBe(1);
      expect(result.address.city).toBe("New York");
    });

    it("should handle deeply nested objects", () => {
      interface Level3 {
        value: string;
      }

      interface Level2 {
        level3: Level3;
      }

      interface Level1 {
        level2: Level2;
      }

      const result = fake<Level1>({
        level2: {
          level3: {
            value: "deep",
          },
        },
      });

      expect(result.level2.level3.value).toBe("deep");
    });
  });

  describe("arrays", () => {
    it("should handle array properties", () => {
      interface WithArray {
        items: string[];
        count: number;
      }

      const result = fake<WithArray>({
        items: ["a", "b", "c"],
      });

      expect(result.items).toEqual(["a", "b", "c"]);
      expect(result.items.length).toBe(3);
    });

    it("should handle arrays of objects", () => {
      interface Item {
        id: string;
        name: string;
      }

      interface Container {
        items: Item[];
      }

      const result = fake<Container>({
        items: [
          { id: "1", name: "First" },
          { id: "2", name: "Second" },
        ],
      });

      expect(result.items).toHaveLength(2);
      expect(result.items[0].id).toBe("1");
      expect(result.items[1].name).toBe("Second");
    });
  });

  describe("functions", () => {
    it("should preserve function properties", () => {
      interface WithFunction {
        id: number;
        execute: () => string;
      }

      const mockFn = () => "executed";
      const result = fake<WithFunction>({
        id: 1,
        execute: mockFn,
      });

      expect(result.id).toBe(1);
      expect(result.execute).toBe(mockFn);
      expect(result.execute()).toBe("executed");
    });
  });

  describe("complex scenarios", () => {
    it("should handle mixed types", () => {
      interface Complex {
        id: number;
        name: string;
        tags: string[];
        metadata: Record<string, unknown>;
        active: boolean;
      }

      const result = fake<Complex>({
        id: 42,
        tags: ["test", "example"],
        metadata: { key: "value" },
      });

      expect(result.id).toBe(42);
      expect(result.tags).toEqual(["test", "example"]);
      expect(result.metadata).toEqual({ key: "value" });
    });

    it("should handle optional properties", () => {
      interface WithOptional {
        required: string;
        optional?: number;
      }

      const result = fake<WithOptional>({
        required: "test",
      });

      expect(result.required).toBe("test");
      expect(result.optional).toBeUndefined();
    });
  });

  describe("type safety", () => {
    it("should maintain type information at compile time", () => {
      interface TypedInterface {
        id: number;
        name: string;
      }

      const result = fake<TypedInterface>({ id: 1 });

      // These should compile without errors
      const id: number = result.id;
      const name: string = result.name;

      expect(id).toBe(1);
      expect(name).toBeUndefined();
    });
  });
});
