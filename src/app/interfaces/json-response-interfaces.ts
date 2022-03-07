import { PaginateInterfaces } from "./paginate-interfaces";

export interface JsonResponseInterfaces<Interface> {
    data:Interface;
    meta?: PaginateInterfaces;
}
