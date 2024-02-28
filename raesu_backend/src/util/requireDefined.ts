export function requireDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected defined but got " + val);
    }
}
