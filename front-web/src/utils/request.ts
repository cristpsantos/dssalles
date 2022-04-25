import axios from 'axios';
import { FilterData } from '../type';
import { formatDateToServer } from './formatters';

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
  baseURL
});

export const buildFilterData = (filterData?: FilterData, extraParams?: Record<string, unknown>) => {
  return {
    minDate: formatDateToServer(filterData?.dates?.[0]),
    maxDate: formatDateToServer(filterData?.dates?.[1]),
    gender: filterData?.gender,
    ...extraParams
  };
};
