import { CountryDto } from "./countryDto";
export interface CaseInfoDto {
  Country: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Date: string;
}

export interface CaseRequest {
  country: string;
  from: Date | null;
  to: Date | null;
}
