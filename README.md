# xCompiler - CMPT 432 Compiler Project

A TypeScript-based compiler for a simple programming language, developed as part of CMPT 432 Compilers course.

## Project Structure

```
xCompiler/
├── src/
│   ├── Compiler.ts          # Main compiler entry point
│   ├── lexer/               # Lexical analysis components
│   │   ├── lexer.ts         # Lexer implementation
│   │   ├── token.ts         # Token class
│   │   └── tokenType.ts     # Token type enumeration
│   ├── grammar/             # Language grammar definition
│   │   └── grammar.ts       # Grammar rules and constants
│   ├── utils/               # Utility functions
│   │   ├── logger.ts        # Logging utilities
│   │   ├── errorHandler.ts  # Error handling classes
│   │   └── utils.ts         # General utilities
│   └── types/               # Shared type definitions
│       └── index.ts         # Type exports
├── tests/                   # Test programs
├── dist/                    # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Features

### Lexical Analysis (Project One)

- ✅ Tokenizes source code according to the language grammar
- ✅ Handles multiple programs separated by `$` (EOP marker)
- ✅ Supports keywords: `print`, `while`, `if`, `int`, `string`, `boolean`, `true`, `false`
- ✅ Recognizes operators: `=`, `==`, `!=`, `+`
- ✅ Identifies single-letter identifiers (a-z)
- ✅ Validates string literals (lowercase letters and spaces only)
- ✅ Ignores multi-line comments `/* ... */`
- ✅ Comprehensive error reporting with line and column numbers
- ✅ Warnings for unterminated comments and missing EOP markers
- ✅ Verbose mode for debugging

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

```bash
node dist/Compiler.js <source-file>

# Examples:
node dist/Compiler.js tests/test1.txt
node dist/Compiler.js tests/test5_valid_while.txt
```

## Author

Descartes Tuyishime - CMPT 432 Compilers
