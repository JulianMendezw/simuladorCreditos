import { ISimuladorApi } from "./interfaces";
import axios from "axios";

async function SimuladorApi() {
  const simuladorApiUrl =
    "https://619bb0052782760017445766.mockapi.io/interes/credito-movilidad-sostenible";
  const response = await axios.get<ISimuladorApi[]>(simuladorApiUrl);

  //setting simuladorApiData state.
  return response;
}

export default SimuladorApi;
