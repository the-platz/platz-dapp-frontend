export type KOLMetadataV1 = {
    version: string
    kol_name: string
    works: KOLWork[]
}

export type KOLWork = {
    version: string
    title: string
    published_on: number
    type: string
    uri: string
}