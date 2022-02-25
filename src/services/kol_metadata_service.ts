import axios from "axios";
import { KOLMetadataV1 } from "../models/types/kol_metadata_v1";

export const getKOLMetadataFromIPFSAsync = async (uri: string): Promise<KOLMetadataV1> => {
    const res = await axios.get<KOLMetadataV1>(uri)
    return res?.data
}