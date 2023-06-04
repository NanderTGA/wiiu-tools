import { Client as FTPClient } from "basic-ftp";
import streamToString from "stream-to-string";
import { PassThrough } from "node:stream";
import { parse as parseINI } from "ini";
import { Buffer } from "node:buffer";

import AccountDAT, { RawAccountDAT } from "./account.dat";

const client = new FTPClient();

//client.ftp.verbose = true;
await client.access({
    host: "192.168.0.173",
});

const accountID = 80000001;
const accountInfo = await getAccountInfo(accountID, client);
console.log(accountInfo);

const accounts = await getAccounts(client);
await Promise.all(accounts.map( async accountID => {
    const accountInfo = await getAccountInfo(accountID, client);
}));

client.close();

// I'm assuming nobody is gonna change their mii name without restarting
// TODO caching

function hexStringToUTF16BE(hex: string): string {
    const buffer = Buffer.from(hex, "hex");
    const decodedText = buffer.swap16().toString("utf16le");

    return decodedText;
}

async function getFileContents(remotePath: string, ftpClient: FTPClient) {
    const stream = new PassThrough();
    await ftpClient.downloadTo(stream, remotePath);
    return await streamToString(stream);
}

function numberAsStringToBoolean(numberAsString: string): boolean {
    const number = parseInt(numberAsString);
    const boolean = !!number;
    return boolean;
}

enum Gender {
    Female,
    Male,
}

async function getAccountInfo(accountID: string | number, ftpClient: FTPClient) {
    let accountDATContents = await getFileContents(`/storage_mlc/usr/save/system/act/${accountID}/account.dat`, ftpClient);

    accountDATContents = accountDATContents.replace("AccountInstance_", "AccountInstance=");
    const rawAccountDAT = parseINI(accountDATContents) as RawAccountDAT;

    const parsedAccountDAT: AccountDAT = {
        accountInstance          : rawAccountDAT.AccountInstance,
        persistentId             : rawAccountDAT.PersistentId,
        transferableIdBase       : rawAccountDAT.TransferableIdBase,
        uuid                     : rawAccountDAT.Uuid,
        parentalControlSlotNumber: rawAccountDAT.ParentalControlSlotNo,
        miiData                  : rawAccountDAT.MiiData,
        miiName                  : hexStringToUTF16BE(rawAccountDAT.MiiName).replaceAll("\x00", ""),
        isMiiUpdated             : numberAsStringToBoolean(rawAccountDAT.IsMiiUpdated),
        accountId                : rawAccountDAT.AccountId || undefined,
    };

    return parsedAccountDAT;
}

async function getAccounts(ftpClient: FTPClient): Promise<string[]> {
    const directories = await ftpClient.list("/storage_mlc/usr/save/system/act");
    return directories.filter(fileOrDirectory => fileOrDirectory.isDirectory).map(directory => directory.name);
}