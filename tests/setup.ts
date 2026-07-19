import { afterEach, vi } from "vitest";
import "@testing-library/react";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
