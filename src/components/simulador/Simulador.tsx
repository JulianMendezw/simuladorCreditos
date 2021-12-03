import { ISimuladorUser, IDesglose, ISimuladorApi } from "./interfaces";
import SeguroCapitalizable from "./SeguroCapitalizable";
import ValorTotalPrestamo from "./ValorTotalPrestamo";
import CuotaSinSeguro from "./CuotaSinSeguro";
import { useState, useEffect } from "react";
import SimuladorApi from "./SimuladorApi";
import SeguroCuota from "./SeguroCuota";
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

  // Update every input by user
  const updateUserData = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setSimuladorUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Get the api data from API's simulador.
  useEffect(() => {
    SimuladorApi().then(({ data }) => {
      setSimuladorApiData(data[0]);
    });
  }, []);

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

      switch (simuladorUserData?.metodoPago) {
        case "caja":
          setDesglose((prev) => {
            return {
              ...prev,
              tasaInteres:
                simuladorApiData?.formaPago[0][
                  simuladorUserData?.categoriaAfiliacion
                ],
            };
          });

          break;

        case "libranza":
          setDesglose((prev) => {
            return {
              ...prev,
              tasaInteres:
                simuladorApiData?.formaPago[1][
                  simuladorUserData?.categoriaAfiliacion
                ],
            };
          });
          break;

        default:
          break;
      }

      const cuotaSinSeguro = CuotaSinSeguro(
        desglose?.tasaInteres,
        simuladorUserData.plazoMeses,
        valorTotalPrestamo
      );

      const seguroCuota = SeguroCuota(
        simuladorApiData?.valoresFijos?.seguroDeVida,
        valorTotalPrestamo
      );

      setDesglose((prev) => {
        return { ...prev, valorTotalPrestamo: valorTotalPrestamo };
      });

      setDesglose((prev) => {
        return { ...prev, seguroCapitalizable: seguro };
      });

      const valorCuota = cuotaSinSeguro + seguroCuota;
      setDesglose((prev) => {
        return { ...prev, valorCuotaMensual: valorCuota };
      });
      setDesglose((prev) => {
        return { ...prev, cuotaMensualSinSeguros: cuotaSinSeguro };
      });
      setDesglose((prev) => {
        const interesPorcentaje = parseFloat(
          desglose?.tasaInteres * 100
        ).toFixed(1);
        return { ...prev, tasaInteresPorcentaje: interesPorcentaje };
      });
      setDesglose((prev) => {
        return { ...prev, segurosMensuales: seguroCuota };
      });

      console.log(desglose);
    }
  };

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

            {simuladorApiData?.valoresFijos?.texto.map((apiData: any) => (
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
        <p>Seguro: $ {desglose?.seguroCapitalizable}</p>
        <p>IVA seguro: $ {desglose?.ivaSeguro}</p>
        <h2>Valor Cuota Mensual: $ {desglose?.valorCuotaMensual}</h2>
        <p>Cuota mensual sin seguros: $ {desglose?.cuotaMensualSinSeguros}</p>
        <p>Seguros mensuales:{desglose?.segurosMensuales}</p>
        <p>Cuota de manejo: $ {simuladorApiData?.valoresFijos?.cuotaManejo}</p>
        <p>Seguro de vida: $ {simuladorApiData?.valoresFijos?.seguroDeVida}</p>
      </div>
    </div>
  );
};

export default Simulador;
