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
export default CuotaSinSeguro;
