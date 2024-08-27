'use client'
import Table from "@/components/table"
import axios from "axios";
import clsx from "clsx"
import { useState, useEffect } from "react"

interface Regis {
    id: number,
    polyclinic_id: number, 
    
}

interface Cashier {
  id: number,
  name: string,
  registration: Regis[],
}

// export async function getCashier() {
//     const response = await fetch(`http://api-simrs.serpihantech.com/api/patients`, {
//       method: 'GET'
//     });
//     return response.json();
// };

export default function TableCashier () {
    const tableHeaders = ["   ", "ID", "Nama", "No RM", "Poliklinik", "Dokter", "Status Bayar"];
    // const cashiers = await getCashier()
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data: response} = await axios.get('http://api-simrs.serpihantech.com/api/patients');
          setData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error)
        }
      };
      fetchData();
    }, []);
    
    
    return (
        <Table tableHead={tableHeaders}>
          {data.map((cashier: Cashier, index: number) => (
            <tr key={index} className={clsx("bg-basic-white", {"bg-brand-10 bg-opacity-15": (index%2 == 0)}) }>
              <td className="px-4 py-4 text-center"><input type="checkbox" className="" /></td>
              <td className="px-4 py-4 text-center">{cashier.id}</td>
              <td className="px-4 py-4 text-center">{cashier.name}</td>
              {/* <td className="px-4 py-4 text-center">{cashier.registration.map(regis: Regis, index: number)}</td> */}
            </tr>
          ))}
        </Table>
    )
}