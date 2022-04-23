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
