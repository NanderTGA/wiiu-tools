/**
 * Parsed data from an `account.dat` file.
 * Do note there are a lot of assumptions here.
 * For example, any key that starts with `is`, is assumed to be a boolean value
 */
export default interface AccountDAT {
    /** The first line of `account.dat`. (I took care of the underscore) */
    accountInstance: string
    /**
     * The user's id (hexadecimal)
     * @example "80000001"
     */
    persistentId: string
    transferableIdBase: string
    uuid: string
    parentalControlSlotNumber: string
    miiData: string
    /** Decoded mii name. */
    miiName: string
    isMiiUpdated: boolean
    /** NNID */
    accountId?: string
    birthYear: string
    birthMonth: string
    birthDay: string
    gender: string
    IsMailAddressValidated: string
    EmailAddress: string
    Country: string
    SimpleAddressId: string
    TimeZoneId: string
    UtcOffset: string
    PrincipalId: string
    NfsPassword: string
    EciVirtualAccount: string
    NeedsToDownloadMiiImage: string
    MiiImageUrl: string
    AccountPasswordHash: string
    IsPasswordCacheEnabled: string
    AccountPasswordCache: string
    NnasType: string
    NfsType: string
    NfsNo: string
    NnasSubDomain: string
    NnasNfsEnv: string
    IsPersistentIdUploaded: string
    IsConsoleAccountInfoUploaded: string
    LastAuthenticationResult: string
    StickyAccountId: string
    NextAccountId: string
    StickyPrincipalId: string
    IsServerAccountDeleted: string
    ServerAccountStatus: string
    MiiImageLastModifiedDate: string
    IsCommitted: string
}

export interface RawAccountDAT {
    /** The first line of `account.dat`. (I took care of the underscore) */
    AccountInstance: string
    /**
     * The user's id (hexadecimal)
     * @example "80000001"
     */
    PersistentId: string
    TransferableIdBase: string
    Uuid: string
    ParentalControlSlotNo: string
    MiiData: string
    /** Undecoded mii name. */
    MiiName: string
    IsMiiUpdated: string
    /** NNID */
    AccountId: string
    BirthYear: string
    BirthMonth: string
    BirthDay: string
    Gender: string
    IsMailAddressValidated: string
    EmailAddress: string
    Country: string
    SimpleAddressId: string
    TimeZoneId: string
    UtcOffset: string
    PrincipalId: string
    NfsPassword: string
    EciVirtualAccount: string
    NeedsToDownloadMiiImage: string
    MiiImageUrl: string
    AccountPasswordHash: string
    IsPasswordCacheEnabled: string
    AccountPasswordCache: string
    NnasType: string
    NfsType: string
    NfsNo: string
    NnasSubDomain: string
    NnasNfsEnv: string
    IsPersistentIdUploaded: string
    IsConsoleAccountInfoUploaded: string
    LastAuthenticationResult: string
    StickyAccountId: string
    NextAccountId: string
    StickyPrincipalId: string
    IsServerAccountDeleted: string
    ServerAccountStatus: string
    MiiImageLastModifiedDate: string
    IsCommitted: string
}