import clsx from "clsx";
import { promises as fs } from "fs"

export default async function Table() {
    const file = await fs.readFile(process.cwd() + '/src/components/table/data.json', 'utf8');
    const data = JSON.parse(file);
    // console.log(data.patients);
    const dataPasien = data.patients;
    const headerPasien = ['NO.REG', 'NAMA', 'USIA', 'JK', 'ALAMAT', 'ASURANSI'];

    return (
        <div className="w-full">
            <ul className="flex flex-col">
                <li className="header">
                    <ul className="header-column flex justify-start">
                        {headerPasien.map((header, index) => (
                            <li key={index} className="w-1/6 py-4 bg-brand-10 bg-opacity-10 text-body text-gray-medium flex justify-center">{header}</li>
                        ))}
                    </ul>
                </li>
                <li className="field flex flex-col">
                    {dataPasien.map((pasien:any, index:any) => (
                        <ul key={index} className={clsx("field-column flex justify-start items-center py-4 pl-2 text-body-regular text-basic-black", {"bg-brand-10 bg-opacity-10": index%2 != 0})}>
                            <li className="w-1/6 text-gray-medium">{pasien.number}{index}</li>
                            <li className="w-1/6">{pasien.name}</li>
                            <li className="w-1/6">{pasien.age}</li>
                            <li className="w-1/6">{pasien.gender}</li>
                            <li className="w-1/6">{pasien.address}</li>
                            <li className="w-1/6">{pasien.insuranceStatus}</li>
                        </ul>
                    ))}
                </li>
            </ul>
        </div>
    )
}