import { TokenType } from './tokenType.js';

/**
 * Token class - Represents a single token found by the lexer
 * 
 * A token is the smallest meaningful unit in source code.
 * Examples: {, }, int, a, =, 5, $
 * 
 * Each token has:
 * - type: What kind of token it is (OPEN_BLOCK, INT, ID, etc.)
 * - value: The actual text from the source code ("{", "int", "a", etc.)
 * - line: Which line number it was found on (starting from 1)
 * - column: Which column number it was found at (starting from 1)
 * 
 * The line and column information is CRITICAL for error reporting.
 * When we tell the user "Error at (4:40)", they can find it easily.
 */
export class Token {
    public type: TokenType;     // The category/type of this token
    public value: string;       // The actual text from source code
    public line: number;        // Line number (1-based)
    public column: number;      // Column number (1-based)

    /**
     * Create a new token
     * 
     * @param type - The token type (e.g., TokenType.INT, TokenType.OPEN_BLOCK)
     * @param value - The actual text (e.g., "int", "{")
     * @param line - Line number where this token starts (1-based)
     * @param column - Column number where this token starts (1-based)
     * 
     */
    constructor(type: TokenType, value: string, line: number, column: number) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }

    /**
     * Returns a formatted string representation of the token
     * 
     * Format: "TYPE [ value ] found at (line:column)"
     * Example: "INT [ int ] found at (6:3)"
     * 
     * This is what gets printed in DEBUG mode during lexing.
     */
    public toString(): string {
        return `${this.type} [ ${this.value} ] found at (${this.line}:${this.column})`;
    }
}
