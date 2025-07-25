import { post } from "@/utils/http";
import type { ListType } from "./type";
enum Api {
    List = "/stationList"
}


function ListApi(data: ListType) {
    return post(Api.List, data)
}

export {
    ListApi
}
