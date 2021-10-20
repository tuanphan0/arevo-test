
import { DayoneDto } from "./dto/dayoneDto";
import http from "./httpService";

class SummaryService {
  public async DayOneGetCountry(country: string): Promise<DayoneDto[]> {
    const result = await http.get<DayoneDto[]>(`/dayone/country/${country}`);
    return result.data;
  }
}
export default new SummaryService();
