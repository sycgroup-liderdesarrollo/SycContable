import { ConceptInterface } from "./concept-interface";
import { CovenantTypeInterface } from "./covenant-type-interface";
import { EmployeeInterface } from "./employee-interface";
import { PeriodicityTypeInterface } from "./periodicity-type-interface";
import { ProviderInterface } from "./provider-interface";

export interface CovenantInterface{
  id: number,
  name: string,
  active: number,
  image: string,
  covenant_type_id: number,
  periodicity_type_id: number,
  provider_id: number,
  concept_name: string
  length:number,
  covenantType:CovenantTypeInterface,
  users:EmployeeInterface[],
  value:number,
  periodicityType:PeriodicityTypeInterface,
  concept:ConceptInterface,
  provider:ProviderInterface,
}
