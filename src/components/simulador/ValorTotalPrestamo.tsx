function ValorTotalPrestamo(
  seguroCapitalizable: number,
  montoSolicitado: any,
  cuotaManejo: any
) {
  const montoSolicitadoN = parseInt(montoSolicitado);

  return seguroCapitalizable + montoSolicitadoN + cuotaManejo;
}

export default ValorTotalPrestamo;
