export class ResponseToken {
    token: string;

    static fromJson(data: any) {
        return new ResponseToken(data.token);
    }

    constructor(token: string) {
        this.token = token;
    }
}
