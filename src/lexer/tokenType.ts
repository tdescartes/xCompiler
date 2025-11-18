/**
 * Token types based on the grammar
 * 
 * These represent all the valid token types in our language.
 * Each token the lexer finds will be assigned one of these types.
 * 
 * The grammar defines what our language looks like:
 * https://www.labouseur.com/courses/compilers/grammar.pdf
 */
export enum TokenType {
    // ========== KEYWORDS ==========
    // Reserved words that have special meaning in our language

    PRINT = "print",        // print statement: print(x)
    WHILE = "while",        // while loop: while (condition) { }
    IF = "if",              // if statement: if (condition) { }
    INT = "int",            // integer type declaration: int x
    STRING = "string",      // string type declaration: string s
    BOOLEAN = "boolean",    // boolean type declaration: boolean b
    TRUE = "true",          // boolean literal: true
    FALSE = "false",        // boolean literal: false

    // ========== SYMBOLS ==========
    // Special characters that structure the program

    OPEN_BLOCK = "OPEN_BLOCK",      // { - starts a code block/scope
    CLOSE_BLOCK = "CLOSE_BLOCK",    // } - ends a code block/scope
    OPEN_PAREN = "OPEN_PAREN",      // ( - starts expression or parameter list
    CLOSE_PAREN = "CLOSE_PAREN",    // ) - ends expression or parameter list
    QUOTE = "QUOTE",                // " - marks string boundaries (not used directly)

    // ========== OPERATORS ==========
    // Symbols that perform operations

    ASSIGN = "ASSIGN",          // = - assignment operator (x = 5)
    EQUAL = "EQUAL",            // == - equality comparison (x == y)
    NOT_EQUAL = "NOT_EQUAL",    // != - inequality comparison (x != y)
    PLUS = "PLUS",              // + - addition operator (1 + 2)

    // ========== IDENTIFIERS AND LITERALS ==========
    // User-defined names and values

    ID = "ID",          // Single lowercase letter identifier (a, b, c, ..., z)
    // Variables MUST be single letters in our language!

    DIGIT = "DIGIT",    // Single digit (0-9)
    // Numbers are built from individual digits

    CHAR = "char",      // Single lowercase letter inside strings
    // Not used as a separate token, part of string processing

    SPACE = "SPACE",    // Space character (only valid inside strings)
    // Not used as a separate token, part of string processing

    // ========== SPECIAL TOKENS ==========
    // Markers for program boundaries

    EOP = "EOP",        // $ - End of Program marker
    // Each program MUST end with $ in our language

    EOF = "EOF"         // End of File (not used in current implementation)
    // Could be used to detect when source code runs out
}
function getKeyByValue(tokenType: typeof TokenType, value: string): void {
     console.log(typeof(Object.keys(tokenType).find(key => tokenType[key as keyof typeof TokenType] === value)));
 }

// function getValueByKey(tokenType: typeof TokenType, key: string): void {
//     console.log(tokenType[key as keyof typeof TokenType]);
// }
getKeyByValue(TokenType, "int");