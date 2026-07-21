//HTTP Status Code

class HttpStatus {
    // Set correct values: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"),
    // NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
    static readonly OK = new HttpStatus(200, "OK");
    static readonly BAD_REQUEST = new HttpStatus(400, "Bad Request");
    static readonly NOT_FOUND = new HttpStatus(404, "Not Found");
    static readonly INTERNAL_SERVER_ERROR = new HttpStatus(500, "Internal Server Error");

    private static readonly ALL_VALUES = [
        HttpStatus.OK, HttpStatus.BAD_REQUEST,
        HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR
    ];

    readonly code: number;
    readonly message: string;

    private constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    isSuccess(): boolean {
        // Return true if code < 400
        if (this.code < 400){
            return true;
        }else
            return false;
    }

    display(): void {
        // Print: "CODE MESSAGE" e.g. "200 OK"
        console.log(this.code + this.message)
    }

    static fromCode(code: number): HttpStatus | null {
        // Return the HttpStatus matching the code, or null if not found
        return (HttpStatus.ALL_VALUES.find(status => status.code === code)?? null);
    }
}

HttpStatus.OK.display();
HttpStatus.NOT_FOUND.display();

console.log(`Is 200 success? ${HttpStatus.OK.isSuccess()}`);
console.log(`Is 404 success? ${HttpStatus.NOT_FOUND.isSuccess()}`);

const found = HttpStatus.fromCode(500);
if (found !== null) {
    process.stdout.write("Found by code 500: ");
    found.display();
}