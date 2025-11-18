import { Logger } from "../utils/logger.js";
import { log } from 'console';
import { TokenType } from "./tokenType.js";
import { Token } from "./token.js";
import GRAMMAR from "../grammar/grammar.js";

export class Lexer {
    public programs: string[][];
    public programCounter: number;
    public errorCounter: number;
    public currentToken: Token[];
    public line: number;
    public column: number;
    public logger: Logger;
    public tokens: Token[][];
    private wordBuffer: string;
    private incomment: boolean;
    private wordStartLine: number;
    private wordStartColumn: number;

    constructor() {
        this.programs = [];
        this.programCounter = 1;
        this.currentToken = [];
        this.line = 0;
        this.logger = new Logger("Lexer");
        this.column = 0;
        this.errorCounter = 0;
        this.tokens = [];
        this.wordBuffer = "";
        this.incomment = false;
        this.wordStartLine = 0;
        this.wordStartColumn = 0;
    }

    lex(code: string): void {
        const lines: string[] = code.split(/\r?\n/);

        this.tokenize(lines);
    }

    /**
     * Check if a character is a valid letter (a-z)
     */
    private isLetter(char: string): boolean {
        return /^[a-z]$/.test(char);
    }

    /**
     * Check if a character is a digit (0-9)
     */
    private isDigit(char: string): boolean {
        return /^[0-9]$/.test(char);
    }

    /**
     * Check if a character is whitespace (space, tab, newline)
     */
    private isWhitespace(char: string): boolean {
        return /^\s$/.test(char);
    }

    /**
     * Flush the word buffer and create appropriate token
     * This checks if the buffered word is a keyword or identifier
     */

    private flushWordBuffer(): void {
        if (this.wordBuffer.length > 0) {
            if (GRAMMAR.keywords.includes(this.wordBuffer)) {
                // const tokenTypeKey = Object.keys(TokenType).find(key => TokenType[key as keyof typeof TokenType] === this.wordBuffer);
                const tokenTypeKey = Object.keys(TokenType).find(key => TokenType[key as keyof typeof TokenType] === this.wordBuffer) as TokenType;
                const keywordToken = new Token(tokenTypeKey, this.wordBuffer, this.wordStartLine + 1 , this.wordStartColumn + 1);
                this.currentToken.push(keywordToken);
                this.logger.debug(`${keywordToken.toString()}`);
            } else {
                const identifierToken = new Token(TokenType.ID, this.wordBuffer, this.wordStartLine + 1, this.wordStartColumn + 1);
                this.currentToken.push(identifierToken);
                this.logger.debug(`${identifierToken.toString()}`);
            }
            this.wordBuffer = "";
        }
    }

    public tokenize(lines: string[]): void {
        let programCounterTracker = 0;

        for (this.line = 0; this.line < lines.length; this.line++) {
            for (this.column = 0; this.column < lines[this.line].length; this.column++) {
                let character = lines[this.line][this.column];
                if (this.currentToken.length === 0 && this.programCounter === programCounterTracker || this.programCounter === 1) {
                    this.logger.info(`Lexing program ${this.programCounter}...`);
                } else { 
                    programCounterTracker = this.programCounter;
                }

                // Check for comment start: /*
                if (!this.incomment && character === '/' && this.column + 1 < lines[this.line].length
                    && lines[this.line][this.column + 1] === '*') {
                    // Flush any pending word before entering comment
                    this.flushWordBuffer();

                    this.incomment = true;
                    this.column++; // Skip the '*' as well
                    // this.logger.debug(`Comment started at (${this.line + 1}:${this.column})`);
                    continue;
                }

                // Check for comment end: */
                if (this.incomment && character === '*' && this.column + 1 < lines[this.line].length
                    && lines[this.line][this.column + 1] === '/') {
                    this.incomment = false;
                    this.column++; // Skip the '/' as well
                    //this.logger.debug(`Comment ended at (${this.line + 1}:${this.column + 1})`);
                    continue;
                }

                // If we're inside a comment, skip this character
                if (this.incomment) {
                    continue;
                }

                //Build up words (keywords/identifiers)
                if (this.isLetter(character)) {
                    if (this.wordBuffer.length === 0) {
                        this.wordStartLine = this.line;
                        this.wordStartColumn = this.column + 1;
                    }
                    this.wordBuffer += character;
                    continue;
                }

                // If we encounter a non-letter, flush any pending word
                if (this.wordBuffer.length > 0) {
                    this.flushWordBuffer();
                }

                //Handle single-character tokens
                // Whitespace - just skip it
                if (this.isWhitespace(character)) {
                    continue;
                }

                // Digits
                if (this.isDigit(character)) {
                    const token = new Token(TokenType.DIGIT, character, this.line + 1, this.column + 1);
                    this.currentToken.push(token);
                    this.logger.debug(`${token.toString()}`);
                    continue;
                }

                switch (character) {
                    case '{':
                        const token = new Token(TokenType.OPEN_BLOCK, character, this.line + 1, this.column + 1);
                        this.currentToken.push(token);
                        this.logger.debug(`${token.toString()}`);
                        break;
                    case '}':
                        const closeToken = new Token(TokenType.CLOSE_BLOCK, character, this.line + 1, this.column + 1);
                        this.currentToken.push(closeToken);
                        this.logger.debug(`${closeToken.toString()}`);
                        break;

                    case '(':
                        const openParenToken = new Token(TokenType.OPEN_PAREN, character, this.line + 1, this.column + 1);
                        this.currentToken.push(openParenToken);
                        this.logger.debug(`${openParenToken.toString()}`);
                        break;
                    case ')':
                        const closeParenToken = new Token(TokenType.CLOSE_PAREN, character, this.line + 1, this.column + 1);
                        this.currentToken.push(closeParenToken);
                        this.logger.debug(`${closeParenToken.toString()}`);
                        break;
                    case '"':
                        const quoteToken = new Token(TokenType.QUOTE, character, this.line + 1, this.column + 1);
                        this.currentToken.push(quoteToken);
                        this.logger.debug(`${quoteToken.toString()}`);
                        break;
                    case '=':
                        if (lines[this.line][this.column + 1] === '=') {
                            const equalToken = new Token(TokenType.EQUAL, character + lines[this.line][this.column + 1], this.line + 1, this.column + 1);
                            this.currentToken.push(equalToken);
                            this.logger.debug(`${equalToken.toString()}`);
                            this.column++; // Skip next character
                        } else {
                            const assignToken = new Token(TokenType.ASSIGN, character, this.line + 1, this.column + 1);
                            this.currentToken.push(assignToken);
                            this.logger.debug(`${assignToken.toString()}`);
                        }
                        break;
                    case '+':
                        const plusToken = new Token(TokenType.PLUS, character, this.line + 1, this.column + 1);
                        this.currentToken.push(plusToken);
                        this.logger.debug(`${plusToken.toString()}`);
                        break;
                    case '$':
                        const EOP = new Token(TokenType.EOP, character, this.line + 1, this.column + 1);
                        this.currentToken.push(EOP);
                        this.logger.debug(`${EOP.toString()}`);
                        this.programCounter++;
                        this.tokens.push(this.currentToken);  // Save program's tokens when done
                        this.currentToken = [];
                        if (this.errorCounter === 0) {
                            this.logger.info(`Lex completed with ${this.errorCounter} error(s).`);
                        } else {
                            this.logger.info(`Lex failed with ${this.errorCounter} error(s).`);
                        }
                        this.errorCounter = 0; // Reset error counter for next program
                        break;

                    case '!':
                        if (lines[this.line][this.column + 1] === '=') {
                            const notEqualToken = new Token(TokenType.NOT_EQUAL, character + lines[this.line][this.column + 1], this.line + 1, this.column + 1);
                            this.currentToken.push(notEqualToken);
                            this.logger.debug(`${notEqualToken.toString()}`);
                            this.column++; // Skip next character
                        } else {
                            // Standalone '!' is an error
                            this.logger.error(`Error:${this.line + 1}:${this.column + 1} - Expected '=' after '!' for != operator`);
                            this.errorCounter++;
                        }
                        break;
                    case '"':
                        const quoteTok = new Token(TokenType.QUOTE, '"', this.line + 1, this.column + 1);
                        this.currentToken.push(quoteTok);
                        this.logger.debug(`${quoteTok.toString()}`);
                        break;
                    default:
                        this.logger.error(`Error :${this.line + 1}:${this.column + 1} Unrecognized token: ${lines[this.line][this.column]}`);
                        this.errorCounter++;
                        break;
                }
            }
        }
    }

}
