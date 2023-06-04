import { Buffer } from "node:buffer";

const buf = Buffer.from("006e0061006e00640065007200000000000000000000", "hex");
const decodedName = buf.swap16().toString("utf16le");

console.log(decodedName);