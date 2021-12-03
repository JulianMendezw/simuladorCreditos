import React, { createContext, useState } from "react";
import SimuladorApi from "./SimuladorApi";

interface SimuladorContextInterface {
  metodoPago: String;
  montoSolicitado: Number;
  plazoMeses: Number;
  categoriaAfiliacion: String;
}

const SimuladorSessionContext = createContext<SimuladorContextInterface | null>(null);


const CtxProvider: React.FC = props => {
  
}

const SimuladorContext = (props) => {
  const getSimuladorApiData = async () => {
    const apiData = await SimuladorApi();
    return apiData;
  };

  const simuladorInitialState = {
    metodoPago: "",
    montoSolicitado: Number,
    plazoMeses: 12,
    categoriaAfiliacion: String,
  };

  const [simuladorState, setSimuladorState] = useState(simuladorInitialState);

  return (
    <SimuladorSessionContext.Provider
      value={{
        simuladorState,
        getSimuladorApiData,
      }}
    >
      {props.children}
    </SimuladorSessionContext.Provider>
  );
};

export default SimuladorContext;
