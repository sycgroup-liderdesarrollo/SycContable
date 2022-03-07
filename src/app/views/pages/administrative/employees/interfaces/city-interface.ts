import { ProvinceInterface } from "./province-interface";

export interface CityInterface{
  id: number,
  name: string,
  province_id: number,
  danecode: number,
  province: ProvinceInterface
}
