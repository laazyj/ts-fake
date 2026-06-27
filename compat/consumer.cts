// Consumer fixture for the TypeScript compatibility floor (see
// tsconfig.compat.json and the `type-compat` CI job).
//
// This file is `.cts`, so under `node16`/`nodenext` resolution it is treated
// as CommonJS and resolves `ts-fake` through the package's `exports` map via
// the `require` condition (-> dist/index.d.ts). It is the CJS counterpart to
// consumer.mts, covering the other half of the dual-package `exports` map.
import { fake } from "ts-fake";

interface Widget {
  id: string;
  qty: number;
  describe: (verbose: boolean) => string;
}

// Function-valued members are preserved whole and type-checked against their
// declared signature; only the fields the test needs are provided.
const widget = fake<Widget>({
  id: "w1",
  describe: () => "widget",
});

export const widgetId: string = widget.id;
