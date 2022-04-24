import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildChartSeries, chartOptions, sumSalesByDate } from './helpers';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterData, makeRequest } from '../../utils/request';
import { ChartSeriesDataType, FilterData, SalesByDateType } from '../../type';
import { formatDate, formatPrice } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};

function SalesByDate({ filterData }: Props) {
  const [chartSeriesDataType, setChartSeriesDataType] = useState<ChartSeriesDataType[]>([]);
  const [sumTotalSales, setsumTotalSales] = useState(0);

  const params = useMemo(() => buildFilterData(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByDateType[]>('/sales/by-date', { params }).then((response) => {
      const newChartSeries = buildChartSeries(response.data);
      setChartSeriesDataType(newChartSeries);
      const newSumTotalSales = sumSalesByDate(response.data);
      setsumTotalSales(newSumTotalSales);
    });
  }, [params]);

  return (
    <div className="sales-by-date-container base-card">
      <div>
        <h4 className="sales-by-date-title">Evolução das vendas</h4>
        {filterData?.dates && (
          <span className="sales-by-date-period">
            {formatDate(filterData?.dates?.[0])} até {formatDate(filterData?.dates?.[1])}
          </span>
        )}
      </div>
      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity">{formatPrice(sumTotalSales)}</h2>
          <span className="sales-by-date-quantity-label">Vendas no período</span>
          <span className="sales-by-date-quantity-description">
            O gráfico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-by-date-chart">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: chartSeriesDataType }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default SalesByDate;
