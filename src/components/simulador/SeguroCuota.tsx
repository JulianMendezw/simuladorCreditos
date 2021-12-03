function SeguroCuota(seguroDeVida: any, valorTotalPrestamo: any) {
  const seguroDeVidaN = parseInt(seguroDeVida);
  const valorTotalPrestamoN = parseInt(valorTotalPrestamo);

  const seguroCuota = (seguroDeVidaN / (1000000 * 12)) * valorTotalPrestamoN;
  return Math.ceil(seguroCuota);
}
export default SeguroCuota;
