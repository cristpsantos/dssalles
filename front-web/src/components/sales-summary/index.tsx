import './styles.css';
import SalesSummaryCard from './sales-summary-card';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { FilterData, SummaryFormatData } from '../../type';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterData, makeRequest } from '../../utils/request';

type Props = {
  filterData?: FilterData;
};

function SalesSummary({ filterData }: Props) {
  const [summary, setSummary] = useState<SummaryFormatData>({
    min: 0,
    max: 0,
    avg: 0,
    count: 0
  });

  const params = useMemo(() => buildFilterData(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SummaryFormatData>('/sales/summary', { params }).then((response) => {
      setSummary(response.data);
    });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard value={summary.avg.toFixed(2)} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard value={summary.count} label="Quantidade" icon={<SyncIcon />} />
      <SalesSummaryCard value={summary.min} label="Mínima" icon={<BarChartIcon />} />
      <SalesSummaryCard value={summary.max} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummary;
