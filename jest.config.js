module.exports = {
    verbose: true,
    projects: [
        {
            displayName: 'UI Unit test',
            setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
            extraGlobals: ['Math'],
            testEnvironment: 'enzyme',
            testEnvironmentOptions: {
                enzymeAdapter: 'react16'
            },
            unmockedModulePathPatterns: [
                'node_modules'
            ],
            transformIgnorePatterns: [
                '<rootDir>/node_modules/'
            ],
            moduleDirectories: ['node_modules'],
            moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'node'],
            moduleNameMapper: {
            },
            testPathIgnorePatterns: [
                'fixtures'
            ],
            coveragePathIgnorePatterns: [
                '<rootDir>/src/configs/',
                '<rootDir>/src/serviceWorker.js'
            ]
        },
        {
            displayName: 'lint',
            runner: 'jest-runner-eslint',
            testMatch: ['<rootDir>/**/*.js', '<rootDir>/**/*.jsx']
        }
    ]
};
