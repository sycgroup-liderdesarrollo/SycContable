import { CovenantInterface } from "../../covenants/interfaces/covenants-interface";
import { CityInterface } from "../../employees/interfaces/city-interface";
import { IdentificationTypeInterface } from "../../employees/interfaces/identification-type-interface";
import { constitutionTypeInterface } from "./constitution-type-interface";
import { ContactInterface } from "./contact-interface";
import { responsabilityTypeInterface } from "./responsability-type-interface";

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
  city:CityInterface,
  status: boolean,
  responsabilityType: responsabilityTypeInterface,
  constitutionType: constitutionTypeInterface,
  identificationType: IdentificationTypeInterface,
  contact: ContactInterface[],
  covenants: CovenantInterface[],
}
