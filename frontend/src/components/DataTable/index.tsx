import Pagination from "components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { SalePage } from "types/sale";
import { BASE_URL } from "utils/requests";
import { formatLocalDate } from "utils/format";

const DataTable = () => {
  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });
  
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    showPagination();
  }, [activePage]);

  const showPagination = () => {
    axios
      .get(`${BASE_URL}/sales?page=${activePage}&size=10&sort=date,desc`)
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handlePage = (index: number) => {
    setActivePage(index)
  }

  return (
    <>
      <Pagination page={page} onPageChange={handlePage} />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((item) => (
              <tr key={item.id}>
                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                <td>{item.seller.name}</td>
                <td>{item.visited}</td>
                <td>{item.deals}</td>
                <td>R$ {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
