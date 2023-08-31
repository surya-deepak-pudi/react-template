module.exports = {
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "^Utils(.*)$": "<rootDir>/src/utils$1",
        "^Mocks(.*)$": "<rootDir>/src/mocks$1",
        "^Hooks(.*)$": "<rootDir>/src/hooks$1",
        "^Assets(.*)$": "<rootDir>/src/assets$1",
        "^Components(.*)$": "<rootDir>/src/components$1",
        "^Contexts(.*)$": "<rootDir>/src/contexts$1",
    },
    testEnvironment: "jsdom",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    setupFilesAfterEnv: ["./jest.setup.js"],
    coverageDirectory: "./coverage",
}
