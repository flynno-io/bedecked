// src/types/models/globals.d.ts

declare module '../models/*.js' {
  const value: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
  export = value;
}
