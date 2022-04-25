export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByDateType = {
  date: string;
  sum: number;
};

export type ChartSeriesDataType = {
  x: string;
  y: number;
};

export type FilterData = {
  dates?: Date[];
  gender?: Gender;
};

export type SummaryFormatData = {
  sum?: number;
  min: number;
  max: number;
  avg: number;
  count: number;
};

export type SalesByStore = {
  storeName: string;
  sum: number;
};

export type SalesByPaymentMethod = {
  description: string;
  sum: number;
};

export type SalesPieChartConfig = {
  labels: string[];
  series: number[];
};

export type SalesResponse = {
  content: Sales[];
};

export type Sales = {
  id: number;
  date: string;
  volume: number;
  total: number;
  gender: Gender;
  categoryName: string;
  paymentMethod: string;
  storeName: string;
};
