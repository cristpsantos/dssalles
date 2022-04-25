import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { buildByPaymentMethod, buildByStoreFormat } from './helpers';
import { FilterData, SalesByPaymentMethod, SalesByStore, SalesPieChartConfig } from './type';
import { buildFilterData, makeRequest } from './utils/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByStore, setSalesByStore] = useState<SalesPieChartConfig>();
  const [salesByPayment, setSalesByPayment] = useState<SalesPieChartConfig>();

  const params = useMemo(() => buildFilterData(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByStore[]>('/sales/by-store', { params }).then((response) => {
      const newSalesByStore = buildByStoreFormat(response.data);
      setSalesByStore(newSalesByStore);
    });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        const newSalesByPayment = buildByPaymentMethod(response.data);
        setSalesByPayment(newSalesByPayment);
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
    console.log({ filter });
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <SalesByDate filterData={filterData} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
          <PieChartCard name="Lojas" labels={salesByStore?.labels} series={salesByStore?.series} />
          <PieChartCard
            name="Pagamento"
            labels={salesByPayment?.labels}
            series={salesByPayment?.series}
          />
        </div>
        <SalesTable filterData={filterData} />
      </div>
    </>
  );
}

export default App;
