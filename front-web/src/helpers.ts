import { SalesByPaymentMethod, SalesByStore } from './type';

export const buildByStoreFormat = (sales: SalesByStore[]) => {
  const labels = sales.map((sales) => sales.storeName);
  const series = sales.map((sales) => sales.sum);
  return {
    labels,
    series
  };
};

export const buildByPaymentMethod = (sales: SalesByPaymentMethod[]) => {
  const labels = sales.map((sales) => sales.description);
  const series = sales.map((sales) => sales.sum);
  return {
    labels,
    series
  };
};
