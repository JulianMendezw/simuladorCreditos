import axios from "axios";

const SimuladorApi = async (modalidad: string) => {
  let simuladorApiUrl = "";
  let apiUrl: string = "https://619bb0052782760017445766.mockapi.io/interes/";

  if (modalidad === "movilidad") {
    const simuladorApiUrl = apiUrl + "credito-movilidad-sostenible";
  }

  if (modalidad === "herramientas") {
    const simuladorApiUrl = apiUrl + "creditos-para-convenios";
  }
  const response = await axios.get(simuladorApiUrl);

  console.log("from simulador api");
  console.log("--------------------------------");
  console.log(response);
  console.log("--------------------------------");
  return response;
};

export default SimuladorApi;
