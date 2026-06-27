// Consumer fixture for the TypeScript compatibility floor (see
// tsconfig.compat.json and the `type-compat` CI job).
//
// This file is `.mts`, so under `node16`/`nodenext` resolution it is treated
// as ESM and resolves `ts-fake` through the package's `exports` map via the
// `import` condition (-> dist/index.d.mts). Importing the package by name
// (a self-reference) exercises the published type entry points exactly as a
// downstream ESM consumer would, rather than importing source directly.
//
// Stable resolution of these `exports`-conditioned types landed in
// TypeScript 4.7, which is why 4.7 is the supported floor. Compiling this
// file under TS 4.7 is the honest proof of that claim.
import { fake } from "ts-fake";

interface User {
  id: number;
  name: string;
  address: { street: string; city: string };
}

// Deep-partial input: required fields may be omitted and nested objects may
// be specified partially. The result is typed as the full `User`.
const user = fake<User>({ id: 1, address: { city: "London" } });

export const userName: string = user.name;
