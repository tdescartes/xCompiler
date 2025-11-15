import Logger from "../utils/logger.js";
import { log } from 'console';
import { TokenType } from "./tokenType.js";

export class Lexer {
    public programs: string[][];
    public programCounter: number;
    public errorCounter: number;
    public currentToken: string;
    public line: number;
    public column: number;
    public logger: Logger;
    constructor() {
        this.programs = [];
        this.programCounter = 0;
        this.currentToken = "";
        this.line = 1;
        this.logger = new Logger("Lexer");
        this.column = 1;
        this.errorCounter = 0;
    }

    lex(code: string): void {
        console.log("I'm lexing the code, Mister Luthor.");
        const lines: string[] = code.split(/\r?\n/);
        for (this.line = 0; this.line < lines.length; this.line++) {
            for (this.column = 0; this.column < lines[this.line].length; this.column++) {
                if (lines[this.line][this.column] !== '$') {

                    console.log(`Token ${lines[this.line][this.column]} found at (${this.line + 1}:${this.column + 1})`);
                }
                if (lines[this.line][this.column] === '$') {
                    this.programCounter++;
                    this.logger.info(`Lex completed with ${this.errorCounter} error(s).`);
                }
                // console.log(`Line ${this.line + 1}: ${code[this.line]}`);
            }
            // return code.length;
        }

    }

    // public getTypes(type: string): TokenType {
    //     return this.programCounter;
    // }
}
