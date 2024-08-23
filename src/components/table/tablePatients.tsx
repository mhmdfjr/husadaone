import Table from "@/components/table"

interface Patient {
  id: number,
  name: string,
  gender: string,
  address: string,
  medical_history: string
}

export async function getPatients() {
    const response = await fetch(`http://192.168.18.31/api/patients`, {
      method: 'GET'
    });
    return response.json();
};

export default async function TablePatients () {
    const tableHeaders = ["ID", "Nama", "JK", "Alamat", "Penyakit"];
    const patients = await getPatients()
    
    return (
        <Table tableHead={tableHeaders}>
          {patients.data.map((patient: Patient, index: number) => (
            <tr key={index} className={ index%2 == 0 ? "bg-brand-10" : "bg-basic-white"}>
              <td className="px-4 py-4 text-center">{patient.id}</td>
              <td className="px-4 py-4 text-center">{patient.name}</td>
              <td className="px-4 py-4 text-center">{patient.gender}</td>
              <td className="px-4 py-4 text-center">{patient.address}</td>
              <td className="px-4 py-4 text-center">{patient.medical_history || "Tidak ada data"}</td>
            </tr>
          ))}
        </Table>
    )
}