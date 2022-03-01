import { CityInterface } from "./city-interface";

export interface ProviderInterface{
  id: number,
  name: string,
  last_name: string,
  trade_name: string,
  address: string,
  phone: number,
  identification_number: number,
  iva: number,
  email: string,
  password: string,
  identification_type_id: number,
  city_id: number,
  constitution_type_id: number,
  city:CityInterface
}
