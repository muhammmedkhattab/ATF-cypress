type UnknownRecord = Record<string, unknown>;

export const assertStatus = (status: number, expected: number): void => {
  if (status !== expected) {
    throw new Error(`Expected status ${expected} but got ${status}`);
  }
};

export const requireKeys = (payload: UnknownRecord, keys: string[]): void => {
  keys.forEach((key) => {
    if (!(key in payload)) {
      throw new Error(`Missing required key: ${key}`);
    }
  });
};
