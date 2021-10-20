import http from "./httpService";
import { CountryDto } from "./dto/countryDto";
import { AxiosResponse } from "axios";
import { CaseInfoDto } from "./dto/dayoneDto";

class CountriesService {
  public async GetAll(): Promise<CountryDto[]> {
    const result = await http.get<CountryDto[]>("/countries");
    return result.data;
  } 
}
export default new CountriesService();
