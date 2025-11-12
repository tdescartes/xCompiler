export class Utils {
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
}