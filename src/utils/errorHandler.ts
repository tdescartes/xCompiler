/**
 * Error handling utilities for the lexer
 * 
 * These classes provide structured error reporting with precise location information.
 * For Project One, we only need LexerError since we're not doing parsing or semantic analysis yet.
 */

/**
 * Base class for compiler errors
 * 
 * This stores:
 * - message: What went wrong
 * - line: Which line number (starting from 1)
 * - column: Which column number (starting from 1)
 * - phase: Which compiler phase detected the error (e.g., "Lexer")
 * 
 * This base class can be extended in future projects for Parser and Semantic errors.
 */
export class CompilerError extends Error {
    public line: number;      // Line number where error occurred
    public column: number;    // Column number where error occurred
    public phase: string;     // Phase of compilation (Lexer, Parser, etc.)

    constructor(message: string, line: number, column: number, phase: string) {
        super(message);                    // Call parent Error constructor
        this.name = 'CompilerError';       // Name for this error type
        this.line = line;
        this.column = column;
        this.phase = phase;
    }

    /**
     * Format the error as a readable string
     * Example: "Lexer Error at (4:40): Unrecognized token: @"
     */
    public toString(): string {
        return `${this.phase} Error at (${this.line}:${this.column}): ${this.message}`;
    }
}

/**
 * LexerError - Specific error type for lexical analysis phase
 * 
 * This is used when the lexer encounters:
 * - Unrecognized characters/symbols
 * - Invalid identifiers (like multi-character identifiers)
 * - Malformed strings
 * - Any token that doesn't match our grammar
 * 
 * Example usage:
 *   throw new LexerError("Unrecognized token: @", 4, 40);
 */
export class LexerError extends CompilerError {
    constructor(message: string, line: number, column: number) {
        super(message, line, column, 'Lexer');  // Always set phase to 'Lexer'
        this.name = 'LexerError';
    }
}
