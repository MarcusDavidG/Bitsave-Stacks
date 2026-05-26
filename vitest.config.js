
/// <reference types="vitest" />

import { defineConfig } from "vite";
import { vitestSetupFilePath, getClarinetVitestsArgv } from "@hirosystems/clarinet-sdk/vitest";

/*
  In this file, Vitest is configured so that it works seamlessly with Clarinet and the Simnet.

  The `vitest-environment-clarinet` will initialise the clarinet-sdk
  and make the `simnet` object available globally in the test files.

  `vitestSetupFilePath` points to a file in the `@hirosystems/clarinet-sdk` package that does two things:
    - run `before` hooks to initialize the simnet and `after` hooks to collect costs and coverage reports.
    - load custom vitest matchers to work with Clarity values (such as `expect(...).toBeUint()`)

  The `getClarinetVitestsArgv()` will parse options passed to the command `vitest run --`
    - vitest run -- --manifest ./Clarinet.toml  # pass a custom path
    - vitest run -- --coverage --costs          # collect coverage and cost reports
*/

export default defineConfig({
  test: {
    environment: "clarinet", // use vitest-environment-clarinet
    pool: "forks",
    poolOptions: {
      threads: { singleThread: true },
      forks: { singleFork: true },
    },
    include: ['tests/**/*_test.ts'],
    setupFiles: [
      vitestSetupFilePath,
      // custom setup files can be added here
    ],
    environmentOptions: {
      clarinet: {
        ...getClarinetVitestsArgv(),
        // add or override options
      },
    },
  },
});

// vitest config note 1: coverage threshold and reporter config
// vitest config note 2: coverage threshold and reporter config
// vitest config note 3: coverage threshold and reporter config
// vitest config note 4: coverage threshold and reporter config
// vitest config note 5: coverage threshold and reporter config
// vitest config note 6: coverage threshold and reporter config
// vitest config note 7: coverage threshold and reporter config
// vitest config note 8: coverage threshold and reporter config
// vitest config note 9: coverage threshold and reporter config
// vitest config note 10: coverage threshold and reporter config
// vitest config note 11: coverage threshold and reporter config
// vitest config note 12: coverage threshold and reporter config
// vitest config note 13: coverage threshold and reporter config
// vitest config note 14: coverage threshold and reporter config
// vitest config note 15: coverage threshold and reporter config
// vitest config note 16: coverage threshold and reporter config
// vitest config note 17: coverage threshold and reporter config
// vitest config note 18: coverage threshold and reporter config
// vitest config note 19: coverage threshold and reporter config
// vitest config note 20: coverage threshold and reporter config
// vitest config note 21: coverage threshold and reporter config
// vitest config note 22: coverage threshold and reporter config
// vitest config note 23: coverage threshold and reporter config
// vitest config note 24: coverage threshold and reporter config
// vitest config note 25: coverage threshold and reporter config
// vitest config note 26: coverage threshold and reporter config
// vitest config note 27: coverage threshold and reporter config
// vitest config note 28: coverage threshold and reporter config
// vitest config note 29: coverage threshold and reporter config
// vitest config note 30: coverage threshold and reporter config
// vitest config note 31: coverage threshold and reporter config
// vitest config note 32: coverage threshold and reporter config
// vitest config note 33: coverage threshold and reporter config
// vitest config note 34: coverage threshold and reporter config
// vitest config note 35: coverage threshold and reporter config
// vitest config note 36: coverage threshold and reporter config
// vitest config note 37: coverage threshold and reporter config
// vitest config note 38: coverage threshold and reporter config
// vitest config note 39: coverage threshold and reporter config
// vitest config note 40: coverage threshold and reporter config
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
<!-- update 12 -->
