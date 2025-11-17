import * as fs from 'fs';
import * as path from 'path';
import { Lexer } from './lexer/lexer.js';
import { Token } from './lexer/token.js';

class Compiler {
    public lexer: Lexer;
    public tokens: Token[][];

    constructor() {
        this.lexer = new Lexer();
        this.tokens = [];
    }

    execute() {
        console.log("=".repeat(60));
        console.log("COMPILER - Lexical Analysis Phase");
        console.log("=".repeat(60));

        // Get command line args
        const args = process.argv.slice(2);

        if (args.length === 0) {
            console.error("ERROR: Please provide a source file as a command line argument.");
            console.error("Usage: node dist/Compiler.js <source-file>");
            process.exit(1);
        }

        const fileName = args[0];

        try {
            // Read the source code from the file
            const sourceCode: string = fs.readFileSync(fileName, 'utf-8');
            console.log(`INFO: Test cases from file ${fileName}`);
            console.log("=".repeat(60));

            // Initialize the lexer and tokenize the source code
            // this.lexer = new Lexer(true); // verbose mode = true

            // Perform lexical analysis
            this.lexer.lex(sourceCode);

            // console.log("=".repeat(60));
            // console.log(`INFO: Lexical analysis complete. ${this.tokens.length} program(s) found.`);
            // console.log("=".repeat(60));

        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.error(`ERROR: Source file not found: ${fileName}`);
            } else {
                console.error(`ERROR: Failed to read source file: ${fileName}`);
                console.error(`ERROR Details: ${error.message}`);
            }
            process.exit(1);
        }
    }
}

// Entry point - run the compiler
const compiler = new Compiler();
compiler.execute();