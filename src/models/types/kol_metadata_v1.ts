type KOLMetadataV1 = {
    version: string
    kol_name: string
    works: KOLWorkV1[]
}

type KOLWorkV1 = {
    version: string
    title: string
    published_on: number
    type: string
    uri: string
}

export type {
    KOLMetadataV1
}