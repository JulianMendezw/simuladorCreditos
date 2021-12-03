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

export default SeguroCapitalizable;
