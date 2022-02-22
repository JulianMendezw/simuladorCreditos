function CuotaSinSeguro(
  tasaInteres: any,
  plazoMeses: any,
  valorTotalPrestamo: any
) {
  const plazoMesesN = parseInt(plazoMeses);
  const valorTotalPrestamoN = parseInt(valorTotalPrestamo);

  const cuotaSinSeguro =
    (tasaInteres * (1 + tasaInteres) ** plazoMesesN * valorTotalPrestamoN) /
    ((1 + tasaInteres) ** plazoMesesN - 1);
  return Math.floor(cuotaSinSeguro);
}

function SeguroCapitalizable(
  cuotaManejo: any,
  fondoGarantias: any,
  montoSolicitado: any
) {
  const montoSolicitadoN = parseInt(montoSolicitado, 10);
  const seguro =
    (montoSolicitadoN + cuotaManejo) * (1 / (1 - fondoGarantias * 1.19) - 1);
  return Math.floor(seguro);
}

function SeguroCuota(seguroDeVida: any, valorTotalPrestamo: any) {
  const seguroDeVidaN = parseInt(seguroDeVida);
  const valorTotalPrestamoN = parseInt(valorTotalPrestamo);

  const seguroCuota = (seguroDeVidaN / (1000000 * 12)) * valorTotalPrestamoN;
  return Math.ceil(seguroCuota);
}

function ValorTotalPrestamo(
  seguroCapitalizable: number,
  montoSolicitado: any,
  cuotaManejo: any
) {
  const montoSolicitadoN = parseInt(montoSolicitado);

  return seguroCapitalizable + montoSolicitadoN + cuotaManejo;
}

export { CuotaSinSeguro, SeguroCapitalizable, SeguroCuota, ValorTotalPrestamo };
