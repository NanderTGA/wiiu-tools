import { Buffer } from "buffer";
import iconv from "iconv-lite";

const buf = Buffer.from("006e0061006e00640065007200000000000000000000", "hex");
const decodedName = iconv.decode(buf, "utf16be");
console.log(decodedName);