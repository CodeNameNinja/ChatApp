const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')
module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: `<rootDir>${compilerOptions.baseUrl}`}),
    transformIgnorePatterns: ["node_modules\/(?!axios)"],
    modulePaths: [
        '<rootDir>'
    ],
    setupFilesAfterEnv: [
        "<rootDir>/src/test/setup.ts"
    ]
}