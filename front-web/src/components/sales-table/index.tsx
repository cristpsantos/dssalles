import { useEffect, useMemo, useState } from 'react';
import { FilterData, Gender, Sales, SalesResponse } from '../../type';
import { formatDate, formatPrice } from '../../utils/formatters';
import { buildFilterData, makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const extraParams = {
  page: 0,
  size: 12,
  sort: 'date,desc'
};

function SalesTable({ filterData }: Props) {
  const [sales, setSales] = useState<Sales[]>();
  const params = useMemo(() => buildFilterData(filterData, extraParams), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesResponse>('/sales', { params }).then((response) => {
      setSales(response.data.content);
    });
  }, [params]);

  const formatGender = (gender: Gender) => {
    const textByGender = {
      MALE: 'Masculino',
      FEMALE: 'Feminino',
      OTHER: 'Outros'
    };

    return textByGender[gender];
  };

  return (
    <div className="sales-table-container base-card">
      <h3 className="sales-table-title">Vendas recentes</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Gênero</th>
            <th>Categoria</th>
            <th>Loja</th>
            <th>Forma de pagamento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sales) => (
            <tr key={sales.id}>
              <td>#{sales.id}</td>
              <td>{formatDate(sales.date)}</td>
              <td>{formatGender(sales.gender)}</td>
              <td>{sales.categoryName}</td>
              <td>{sales.storeName}</td>
              <td>{sales.paymentMethod}</td>
              <td>{formatPrice(sales.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
