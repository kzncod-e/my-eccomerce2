const formatToIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const formattedAmount = formatToIDR(1500000);
export default formatToIDR;
