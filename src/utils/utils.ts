/**
 * General utility functions for the compiler
 */
export class Utils {
    /**
     * ROT13 cipher for encoding/decoding strings
     * (Placeholder utility - can be used for obfuscation or fun messages)
     */
    public static rot13(str: string): string {
        let retVal: string = "";
        for (let i = 0; i < str.length; i++) {
            const ch: string = str[i];
            let code: number = 0;
            if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                code = str.charCodeAt(i) + 13;
                retVal = retVal + String.fromCharCode(code);
            } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                code = str.charCodeAt(i) - 13;
                retVal = retVal + String.fromCharCode(code);
            } else {
                retVal = retVal + ch;
            }
        }
        return retVal;
    }

    /**
     * Format a line and column for display
     */
    public static formatPosition(line: number, column: number): string {
        return `(${line}:${column})`;
    }

    /**
     * Repeat a character/string n times
     */
    public static repeat(str: string, count: number): string {
        return str.repeat(count);
    }
}
