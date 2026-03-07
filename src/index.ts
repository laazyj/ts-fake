/**
 * Extend Partial<T> to support deep-partials.
 */
type DeepPartial<T> = T extends (...args: unknown[]) => unknown
  ? T
  : {
      [P in keyof T]?: DeepPartial<T[P]>;
    };

/**
 * Return a fake object of type T that implements only the members required by the test.
 *
 * Why?
 * - Allows defining just the parts of the object required by the test making the tests less fragile to changes in the interface definition.
 * - Better type checking than casting as unknown then T
 * - Preferable to using Partial<T> directly as it avoids the need to cast the Partial<T> back to T when using it.
 */
export function fake<T>(partial?: DeepPartial<T>): T {
  if (partial === undefined) {
    return {} as T;
  }
  return partial as T;
}
