module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "./jest.setup.js",
  ],
  testMatch: ["**/__tests__/**/*.test.tsx", "**/?(*.)+(spec|test).tsx"],
  collectCoverage: true,
  collectCoverageFrom: ["components/**/*.{js,ts,tsx}"],
  transformIgnorePatterns: ["@react-native-async-storage/async-storage"],
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "coverage",
};
