module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  };