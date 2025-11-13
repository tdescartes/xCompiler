// Token types based on the grammar
export enum TokenType {
    // Keywords
    PRINT = "PRINT",
    WHILE = "WHILE",
    IF = "IF",
    INT = "INT",
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    TRUE = "TRUE",
    FALSE = "FALSE",

    // Symbols
    OPEN_BLOCK = "OPEN_BLOCK",
    CLOSE_BLOCK = "CLOSE_BLOCK",
    OPEN_PAREN = "OPEN_PAREN",
    CLOSE_PAREN = "CLOSE_PAREN",
    QUOTE = "QUOTE",

    // Operators
    ASSIGN = "ASSIGN",
    EQUAL = "EQUAL",
    NOT_EQUAL = "NOT_EQUAL",
    PLUS = "PLUS",

    // Identifiers and literals
    ID = "ID",
    DIGIT = "DIGIT",
    CHAR = "CHAR",
    SPACE = "SPACE",

    // End of program
    EOP = "EOP",

    // Special
    EOF = "EOF"
}

// Token class to represent individual tokens
export class Token {
    public type: TokenType;
    public value: string;
    public line: number;
    public column: number;

    constructor(type: TokenType, value: string, line: number, column: number) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }

    public toString(): string {
        return `${this.type} [ ${this.value} ] found at (${this.line}:${this.column})`;
    }
}

// Logging levels
export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
