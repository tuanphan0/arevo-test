import { CaseRequest, CaseInfoDto } from "./dto/dayoneDto";
import http from "./httpService";

class SummaryService {
  public async getCasesForCountryByDate(
    request: CaseRequest
  ): Promise<CaseInfoDto[]> {
    const { country, from, to } = request;
    // from?.setHours(0, 0, 0, 0);
    // to?.setHours(0, 0, 0, 0);
    const result = await http.get<CaseInfoDto[]>(`/country/${country}`);
    return result.data;
  }
}
export default new SummaryService();
