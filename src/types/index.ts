/**
 * Shared types and enums for the compiler
 * 
 * This file exports common types used across multiple components.
 * Keeping them in one place makes the code more maintainable.
 */

/**
 * Logging levels for compiler output
 * 
 * These control the verbosity and importance of log messages:
 * 
 * DEBUG - Most detailed, shows every token found during lexing
 *         Example: "DEBUG Lexer - OPEN_BLOCK [ { ] found at (1:1)"
 *         Only shown when verbose mode is enabled
 * 
 * INFO  - General information about compilation progress
 *         Example: "INFO Lexer - Lexing program 1..."
 *         Only shown when verbose mode is enabled
 * 
 * WARN  - Non-fatal warnings that don't stop compilation
 *         Example: "WARN Lexer - Unterminated comment starting at (2:5)"
 *         ALWAYS shown, even in non-verbose mode
 * 
 * ERROR - Fatal errors that prevent successful compilation
 *         Example: "ERROR Lexer - Unrecognized token: @"
 *         ALWAYS shown, even in non-verbose mode
 */
export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
