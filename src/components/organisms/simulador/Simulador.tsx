import { ISimuladorUser, IDesglose, ISimuladorApi } from "./interfaces";
import { useState, useEffect } from "react";
import SimuladorApi from "./SimuladorApi";
import {
  CuotaSinSeguro,
  SeguroCapitalizable,
  SeguroCuota,
  ValorTotalPrestamo,
} from "./CalcularDesglose";

import "./simulador.scss";
import React from "react";

const Simulador = () => {
  // User data from form state.
  const [simuladorUserData, setSimuladorUserData] = useState<ISimuladorUser>();

  const [desglose, setDesglose] = useState<IDesglose>();
  //Api data from API's simulador.
  const [simuladorApiData, setSimuladorApiData] = useState<ISimuladorApi>({
    formaPago: [{ nombre: "string", TA: 0.8, TB: 0.5, TC: 0.4 }],
  });

  const [error, setError] = useState(null);

  // Update every input by user
  const updateUserData = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "montoSolicitado") {
      if (
        Number(e.target.value) < Number(simuladorApiData?.valoresFijos?.monto?.minimo) ||
        Number(e.target.value) > Number(simuladorApiData?.valoresFijos?.monto?.maximo)
      ) {
        setError(null);
        console.log(error);
      } else {
        setError(null);
      }
    }
    setSimuladorUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validator = () => {
    if (
      simuladorUserData?.metodoPago &&
      simuladorUserData?.montoSolicitado &&
      simuladorUserData?.plazoMeses &&
      simuladorUserData?.categoriaAfiliacion
    ) {
      const seguro = SeguroCapitalizable(
        simuladorApiData?.valoresFijos?.cuotaManejo,
        simuladorApiData?.valoresFijos?.fondoGarantias,
        simuladorUserData.montoSolicitado
      );

      const valorTotalPrestamo = ValorTotalPrestamo(
        seguro,
        simuladorUserData?.montoSolicitado,
        simuladorApiData?.valoresFijos?.cuotaManejo
      );

      let tasa: any = simuladorApiData?.formaPago.filter(
        (item) => item.nombre === simuladorUserData.metodoPago
      )[0][simuladorUserData?.categoriaAfiliacion];

      const cuotaSinSeguro = CuotaSinSeguro(
        tasa,
        simuladorUserData.plazoMeses,
        valorTotalPrestamo
      );

      const seguroCuota = SeguroCuota(
        simuladorApiData?.valoresFijos?.seguroDeVida,
        valorTotalPrestamo
      );

      const valorCuota = cuotaSinSeguro + seguroCuota;

      const interesPorcentaje = parseFloat((tasa * 100).toFixed(1));

      setDesglose({
        valorTotalPrestamo: valorTotalPrestamo,
        seguroCapitalizable: seguro,
        valorCuotaMensual: valorCuota,
        cuotaMensualSinSeguros: cuotaSinSeguro,
        tasaInteresPorcentaje: interesPorcentaje,
        segurosMensuales: seguroCuota,
      });
    }
  };

  useEffect(() => {}, [simuladorUserData?.montoSolicitado]);

  //Get the api data from API's simulador.
  useEffect(() => {
    SimuladorApi().then(({ data }) => {
     
      setSimuladorApiData(data[0]);
    });
  }, []);

  useEffect(() => {
    validator();
    console.log("Calculando...");
  }, [simuladorUserData]);

  return (
    <div className={`simulador`}>
      <div className={`formulario`}>
        <form action="" className={`container`}>
          <label>
            <span>Modalidad:</span>
          </label>
          <select name="modalidad" id="modalidad">
            <option value="herramientas">
              Herramientas de trabajo y estudio
            </option>
            <option value="movilidad">Movilidad sostenible</option>
          </select>

          <label>
            <span>Metodo de pago:</span>
          </label>
          <select name="metodoPago" id="metodoPago" onChange={updateUserData}>
            <option value="">Seleccionar...</option>

            {simuladorApiData?.formaPago?.map((apiData: any) => (
              <option key={apiData.nombre} value={apiData.nombre}>
                {apiData.nombre}
              </option>
            ))}
          </select>

          <label>
            <span>Monto Solicitado</span>
          </label>
          <input
            type="number"
            name="montoSolicitado"
            id="montoSolicitado"
            placeholder="Mínimo: 500.000 - Máximo: 7.000.000"
            onChange={updateUserData}
          />
          {error && <p>{error}</p>}
          <label>
            <span>Plazo en meses:</span>
          </label>
          <input
            type="number"
            name="plazoMeses"
            id="plazo"
            placeholder="0"
            onChange={updateUserData}
          />

          <label>
            <span>Categoria de afiliacion:</span>
          </label>
          <select
            name="categoriaAfiliacion"
            id="afiliacion"
            onChange={updateUserData}
          >
            <option value="">Seleccionar...</option>

            {simuladorApiData?.valoresFijos?.texto?.map((apiData: any) => (
              <option key={apiData.id} value={apiData.value}>
                {apiData.label}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div className={`desglose`}>
        <p>Valor total del prestamo: $ {desglose?.valorTotalPrestamo}</p>
        <p>Interes: {desglose?.tasaInteresPorcentaje}%</p>
        <p>Seguro Capitalizable: $ {desglose?.seguroCapitalizable}</p>
        {/* <p>IVA seguro: $ {desglose?.ivaSeguro}</p> */}
        <h2>Valor Cuota Mensual: $ {desglose?.valorCuotaMensual}</h2>
        <p>Cuota mensual sin seguros: $ {desglose?.cuotaMensualSinSeguros}</p>
        <p>Seguros mensuales:{desglose?.segurosMensuales}</p>
        <p>Cuota de manejo: $ {simuladorApiData?.valoresFijos?.cuotaManejo}</p>
      </div>
    </div>
  );
};

export default Simulador;
