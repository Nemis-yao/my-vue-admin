import { post } from "@/utils/http";
import type { ListType } from "./type";
import type {RowType} from '@/types/station.ts'

enum Api {
    List = "/stationList",
    edit = "/station/edit",
  delete = "/station/delete",

}


function ListApi(data: ListType) {
    return post(Api.List, data)
}

function editApi(data: RowType) {
  return post(Api.edit, data)
}

function deleteApi(id: string) {
  return post(Api.delete, { id })
}

export {
    ListApi,editApi,deleteApi
}
