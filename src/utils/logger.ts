import { LogLevel } from '../types/index.js';

/**
 * Logger utility for consistent logging throughout the compiler
 * 
 * This class provides structured logging with different levels:
 * - DEBUG: Detailed information for debugging (e.g., each token found)
 * - INFO: General information (e.g., "Lexing program 1...")
 * - WARN: Warning messages for non-fatal issues (e.g., missing EOP marker)
 * - ERROR: Error messages for fatal issues (e.g., unrecognized token)
 * 
 * The verbose flag controls whether DEBUG messages are shown.
 * WARN and ERROR messages are ALWAYS shown, even in non-verbose mode.
 */
export class Logger {
    private verbose: boolean;   // Controls whether DEBUG/INFO messages are shown
    private component: string;  // Name of component doing the logging (e.g., "Lexer")

    /**
     * Create a new logger
     * @param component - Name of the component (e.g., "Lexer", "Compiler")
     * @param verbose - Whether to show DEBUG messages (default: true)
     */
    constructor(component: string, verbose: boolean = true) {
        this.component = component;
        this.verbose = verbose;
    }

    /**
     * Log a message with the specified level
     * Format: "LEVEL Component - message"
     * Example: "DEBUG Lexer - OPEN_BLOCK [ { ] found at (1:1)"
     */
    public log(level: LogLevel, message: string): void {
        // Always show WARN and ERROR, only show DEBUG/INFO if verbose is true
        if (this.verbose || level === LogLevel.ERROR || level === LogLevel.WARN) {
            console.log(`${level} ${this.component} - ${message}`);
        }
    }

    /**
     * Log a DEBUG message
     * Used for detailed token information during lexing
     * Example: debug("OPEN_BLOCK [ { ] found at (1:1)")
     */
    public debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    /**
     * Log an INFO message
     * Used for high-level progress information
     * Example: info("Lexing program 1...")
     */
    public info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    /**
     * Log a WARNING message
     * Used for non-fatal issues that don't stop compilation
     * Example: warn("Unterminated comment starting at (2:5)")
     */
    public warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    /**
     * Log an ERROR message
     * Used for fatal issues that prevent successful compilation
     * Example: error("Unrecognized token: @")
     */
    public error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    /**
     * Enable or disable verbose mode
     * When verbose is false, only WARN and ERROR messages are shown
     */
    public setVerbose(verbose: boolean): void {
        this.verbose = verbose;
    }
}
