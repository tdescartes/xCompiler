import { Logger } from "../utils/logger.js";
import { log } from 'console';
import { TokenType } from "./tokenType.js";
import { Token } from "./token.js";

export class Lexer {
    public programs: string[][];
    public programCounter: number;
    public errorCounter: number;
    public currentToken: Token | null;
    public line: number;
    public column: number;
    public logger: Logger;
    public tokens: Token[][];
    constructor() {
        this.programs = [];
        this.programCounter = 0;
        this.currentToken = null;
        this.line = 1;
        this.logger = new Logger("Lexer");
        this.column = 1;
        this.errorCounter = 0;
        this.tokens = [];
    }

    lex(code: string): void {
        const lines: string[] = code.split(/\r?\n/);
        
        this.tokenize(lines);
    }

    public tokenize(lines: string[]): void {
        let currentProgramTokens: Token[] = [];
        for (this.line = 0; this.line < lines.length; this.line++) {
            for (this.column = 0; this.column < lines[this.line].length; this.column++) {
                if (currentProgramTokens.length === 0) {
                    this.logger.info(`Lexing program ${this.programCounter}...`);
                }
                switch(lines[this.line][this.column]) {
                    case '{':
                        const token = new Token(TokenType.OPEN_BLOCK, "{", this.line + 1, this.column + 1);
                        currentProgramTokens.push(token);
                        this.logger.debug(`${token.toString()}`);
                        break;
                    case '}':
                        const closeToken = new Token(TokenType.CLOSE_BLOCK, "}", this.line + 1, this.column + 1);
                        currentProgramTokens.push(closeToken);
                        this.logger.debug(`${closeToken.toString()}`);
                        break;

                    case '(':
                        const openParenToken = new Token(TokenType.OPEN_PAREN, "(", this.line + 1, this.column + 1);
                        currentProgramTokens.push(openParenToken);
                        this.logger.debug(`${openParenToken.toString()}`);
                        break;
                    case ')':
                        const closeParenToken = new Token(TokenType.CLOSE_PAREN, ")", this.line + 1, this.column + 1);
                        currentProgramTokens.push(closeParenToken);
                        this.logger.debug(`${closeParenToken.toString()}`);
                        break;
                    case '"':
                        const quoteToken = new Token(TokenType.QUOTE, '"', this.line + 1, this.column + 1);
                        currentProgramTokens.push(quoteToken);
                        this.logger.debug(`${quoteToken.toString()}`);
                        break;
                    case '=':
                        const assignToken = new Token(TokenType.ASSIGN, "=", this.line + 1, this.column + 1);
                        currentProgramTokens.push(assignToken);
                        this.logger.debug(`${assignToken.toString()}`);
                        break;
                    case '+':
                        const plusToken = new Token(TokenType.PLUS, "+", this.line + 1, this.column + 1);
                        currentProgramTokens.push(plusToken);
                        this.logger.debug(`${plusToken.toString()}`);
                        break;
                    case '$':
                        const EOP = new Token(TokenType.EOP, "$", this.line + 1, this.column + 1);
                        currentProgramTokens.push(EOP);
                        this.logger.debug(`${EOP.toString()}`);
                        this.programCounter++;
                        this.tokens.push(currentProgramTokens);  // Save program's tokens when done
                        currentProgramTokens = []; 
                        this.logger.info(`Lex completed with ${this.errorCounter} error(s).`);
                        break;          
                    case '==':
                        const equalToken = new Token(TokenType.EQUAL, "==", this.line + 1, this.column + 1);
                        currentProgramTokens.push(equalToken);
                        this.logger.debug(`${equalToken.toString()}`);
                        break;
                    case '!=':
                        const notEqualToken = new Token(TokenType.NOT_EQUAL, "!=", this.line + 1, this.column + 1);
                        currentProgramTokens.push(notEqualToken);
                        this.logger.debug(`${notEqualToken.toString()}`);
                        break;
                    case 'int':
                        const intToken = new Token(TokenType.INT, "int", this.line + 1, this.column + 1);
                        currentProgramTokens.push(intToken);    
                        this.logger.debug(`${intToken.toString()}`);
                        break;
                    case 'print':
                        const printToken = new Token(TokenType.PRINT, "print", this.line + 1, this.column + 1);
                        currentProgramTokens.push(printToken);  
                        this.logger.debug(`${printToken.toString()}`);
                        break;
                    case 'while':
                        const whileToken = new Token(TokenType.WHILE, "while", this.line + 1, this.column + 1);
                        currentProgramTokens.push(whileToken);
                        this.logger.debug(`${whileToken.toString()}`);
                        break;
                    case 'if':
                        const ifToken = new Token(TokenType.IF, "if", this.line + 1, this.column + 1);
                        currentProgramTokens.push(ifToken);
                        this.logger.debug(`${ifToken.toString()}`);
                        break;
                    case 'string':
                        const stringToken = new Token(TokenType.STRING, "string", this.line + 1, this.column + 1);
                        currentProgramTokens.push(stringToken);
                        this.logger.debug(`${stringToken.toString()}`);
                        break;
                    case 'boolean':
                        const booleanToken = new Token(TokenType.BOOLEAN, "boolean", this.line + 1, this.column + 1);
                        currentProgramTokens.push(booleanToken);
                        this.logger.debug(`${booleanToken.toString()}`);
                        break;
                    case 'true':
                        const trueToken = new Token(TokenType.BOOLEAN, "true", this.line + 1, this.column + 1);
                        currentProgramTokens.push(trueToken);
                        this.logger.debug(`${trueToken.toString()}`);
                        break;
                    case 'false':
                        const falseToken = new Token(TokenType.BOOLEAN, "false", this.line + 1, this.column + 1);
                        currentProgramTokens.push(falseToken);
                        this.logger.debug(`${falseToken.toString()}`);
                        break;
                    case 'while':
                        const whileTok = new Token(TokenType.WHILE, "while", this.line + 1, this.column + 1);
                        currentProgramTokens.push(whileTok);
                        this.logger.debug(`${whileTok.toString()}`);
                        break;
                    case '"':
                        const quoteTok = new Token(TokenType.QUOTE, '"', this.line + 1, this.column + 1);
                        currentProgramTokens.push(quoteTok);
                        this.logger.debug(`${quoteTok.toString()}`);
                        break;
                    case '/*':
                        
                        break;
                    case '*/':
                        
                        break;
                    case ' ':
                        // Ignore whitespace
                        break;
                    default:
                        this.logger.warn(`Error :${this.line + 1}:${this.column + 1} Unrecognized token: ${lines[this.line][this.column]}`);
                        this.errorCounter++;
                        // Handle unknown characters or whitespace
                        break;
                }
            }
        }
    }

    // public createTokens(word: string): Token | null {
    //     const type = this.getTypes(word);
    //     if (!type) return null;
    //     const token = new Token(type, word, this.line, this.column);

    //     return token;
    // }

    // public getTypes(word: string): TokenType | null {
    //     return this.programCounter;
    // }
}
