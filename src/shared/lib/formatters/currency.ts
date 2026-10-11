const formatCurrency = (amount: number = 0) => {
  return amount.toLocaleString('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0
  })
}

export default formatCurrency
