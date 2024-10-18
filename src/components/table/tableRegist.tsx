import { useState, useEffect } from "react";
import Table from "@/components/table";
import axios from "axios";
import { Edit, Trash } from "iconsax-react";
import { useForm } from "react-hook-form";
import Button from "../button";
import { TickSquare } from "iconsax-react";
import Popup from "@/components/popup";

interface Polyclinic {
  name: string;
}

interface Patient {
  id: number;
  name: string;
  gender: string;
}

interface Doctor {
  id: number;
  name: string;
}

interface Regist {
  id: number;
  patient: Patient;
  polyclinic: Polyclinic;
  doctor: Doctor;
}

function getPatients() {
  return axios
    .get("https://api-simrs.serpihantech.com/api/registrations")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching patients:", error);
      return { data: [] };
    });
}

function deleteRegist(id: number) {
  return axios
    .delete(`https://api-simrs.serpihantech.com/api/registrations/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting data:", error);
      throw error;
    });
}

function updateRegist(id: number, updatedData: Regist) {
  return axios
    .put(
      `https://api-simrs.serpihantech.com/api/registrations/${id}`,
      updatedData
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
}

export default function TablePatients() {
  const [regist, setRegist] = useState<Regist[]>([]);
  const [selectedRegist, setSelectedRegist] = useState<Regist | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Regist>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getPatients().then((data) => {
      setRegist(Array.isArray(data) ? data : data.data || []);
    });
  };

  const handleDelete = (id: number) => {
    deleteRegist(id).then(() => {
      setRegist((prevRegist) => prevRegist.filter((item) => item.id !== id));
    });
  };

  const handleEditClick = (regist: Regist) => {
    setSelectedRegist(regist);
    reset(regist);
    setIsModalEditOpen(true);
  };

  const handleEditSubmit = (updatedData: Regist) => {
    if (selectedRegist) {
      updateRegist(selectedRegist.id, updatedData).then(() => {
        // Re-fetch data from the server after a successful update
        fetchData();
        setIsModalEditOpen(false);
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
    setSelectedRegist(null);
  };

  const tableHeaders = [
    "No Regis",
    "Nama",
    "No RM",
    "Poliklinik",
    "Dokter",
    "Status Rawat",
    "Aksi",
  ];

  if (!Array.isArray(regist)) {
    return (
      <div>
        Error: Expected an array of registrations. Data received:{" "}
        {JSON.stringify(regist)}
      </div>
    );
  }

  return (
    <>
      <Table tableHead={tableHeaders}>
        {regist.map((regist, index) => (
          <tr key={index} className="bg-basic-white">
            <td className="px-6 py-4 text-center">
              {regist.id < 10 ? `0${regist.id}` : regist.id}
            </td>
            <td className="px-8 py-4 text-center">{regist.patient.name}</td>
            <td className="px-6 py-4 text-center">
              {regist.patient.id < 10
                ? `0${regist.patient.id}`
                : regist.patient.id}
            </td>
            <td className="px-2 py-4 text-center">{regist.polyclinic.name}</td>
            <td className="px-2 py-4 text-center">{regist.doctor.name}</td>
            <td className="px-1 py-4 text-center">{"-"}</td>
            <td className="px-2 py-4 text-center">
              <div className="flex items-center gap-x-5 ml-12">
                <Edit
                  size="24"
                  color="#2F7BFE"
                  className="cursor-pointer"
                  onClick={() => handleEditClick(regist)}
                />
                <Trash
                  size="24"
                  color="#E90C1B"
                  className="cursor-pointer"
                  onClick={() => handleDelete(regist.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal */}
      {isModalEditOpen && selectedRegist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Registration</h2>
            <form onSubmit={handleSubmit(handleEditSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Patient Name
                </label>
                <input
                  {...register("patient.name", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue={selectedRegist?.patient.name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Gender</label>
                <input
                  {...register("patient.gender", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue={selectedRegist?.patient.gender}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Polyclinic</label>
                <input
                  {...register("polyclinic.name", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue={selectedRegist?.polyclinic.name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Doctor</label>
                <input
                  {...register("doctor.name", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue={selectedRegist?.doctor.name}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  label={"Cancel"}
                  variant="secondary"
                  onClick={handleCloseModal}
                />
                <Button
                  type="submit"
                  label={"Edit"}
                  variant="primary"
                  onClick={() => {}}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
