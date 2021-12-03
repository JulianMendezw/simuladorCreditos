interface ISimuladorUser {
  metodoPago?: string;
  montoSolicitado?: number;
  plazoMeses?: number;
  categoriaAfiliacion?: string;
}

interface IDesglose {
  valorTotalPrestamo?: number;
  seguroCapitalizable?: number;
  ivaSeguro?: number;
  valorCuotaMensual?: number;
  cuotaMensualSinSeguros?: number;
  tasaInteres?: number;
  tasaInteresPorcentaje?: number;
  segurosMensuales?: number;
}

interface ISimuladorApi {
  valoresFijos?: {
    cuotaManejo: number;
    seguroDeVida: number;
    fondoGarantias: number;
    monto: { maximo: number; minimo: number };
    plazo: { maximo: number; minimo: number };
    texto: [{ id: number; value: string; label: string }];
  };
  formaPago: [
    {
      [key: string]: string | number;
      nombre: string;
      TA: number;
      TB: number;
      TC: number;
    }
  ];
}

export type { ISimuladorUser, IDesglose, ISimuladorApi };
