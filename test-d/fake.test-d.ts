import { expectType, expectError } from "tsd";
import { fake } from "../src/index";

interface User {
  name: string;
  address: { street: string; city: string };
  greet: (loud: boolean) => string;
}

// `fake<T>()` returns exactly T, whether called with no input or a partial.
expectType<User>(fake<User>());
expectType<User>(fake<User>({ name: "Ada" }));

// Deep-partial input: required fields may be omitted and nested objects may
// be specified partially.
fake<User>({ address: { city: "London" } });

// Provided values are still type-checked against T, shallow and nested.
expectError(fake<User>({ name: 123 }));
expectError(fake<User>({ address: { city: 123 } }));

// Properties that do not exist on T are rejected.
expectError(fake<User>({ nope: true }));

// Function members are preserved whole (not deep-partialed): a correctly
// typed function is accepted, a return-type mismatch is rejected.
fake<User>({ greet: () => "hi" });
expectError(fake<User>({ greet: () => 42 }));
