class Compiler{
    public lex:Lexer = null;
	 public tokenStream = null;
	 
    constructor() {
    }

    execute() {
        this.lex = new Lexer();
        this.tokenStream = this.lex.doit("some test code");
        console.log(this.tokenStream);
    }
}
