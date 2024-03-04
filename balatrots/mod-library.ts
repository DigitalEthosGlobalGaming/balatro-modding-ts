export function makeRequest() {
    const http = require("socket.http")
    const {body, code, headers, status} = http.request("https://www.google.com");
    print(body);
    print(code);
    print(headers);
    print(status);
}