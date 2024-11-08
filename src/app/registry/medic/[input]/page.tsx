"use client";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import DatePicker from "@/components/date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight2 } from "iconsax-react";
import axios from "axios";

interface Patient {
  id: number;
  name: string;
  gender: string;
  blood_type: string;
  place_of_birth: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  insurance: string;
  allergy: string;
  disability: string;
  pic_name: string;
  pic_status: string;
  pic_address: string;
}

interface Registration {
  id: number;
  patient_id: number;
  polyclinic_id: number;
  doctor_id: number;
  registration_date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  recipe: string;
  already_paid: string;
  patient: Patient;
}

export default function InputMedic() {
  const [medic, setMedic] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");
  const [birthPlace, setBirthPlace] = useState<string>("");
  const [addressPatient, setAddressPatient] = useState<string>("");
  const [disability, setDisability] = useState<string>("");
  const [namePic, setNamePic] = useState<string>("");
  const [statusPic, setStatusPic] = useState<string>("");
  const [addressPic, setAddressPic] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [registerDate, setRegisterDate] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = searchParams.get("input");

  const registrationData = {
    id: 0,
    patient_id: 0,
    polyclinic_id: 0,
    doctor_id: 0,
    registration_date: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    diagnosis: "",
    recipe: "",
    already_paid: "",
    patient: {
      id: 0,
      name: "",
      gender: "",
      blood_type: "",
      place_of_birth: "",
      date_of_birth: "",
      phone_number: "",
      address: "",
      insurance: "",
      allergy: "",
      disability: "",
      pic_name: "",
      pic_status: "",
      pic_address: "",
    },
  };

  const handleBirthDate = (date: string) => {
    setBirthDate(date);
  };

  const handleRegisterDate = (date: string) => {
    setRegisterDate(date);
  };

  // useEffect(() => {
  //   console.log(registerDate);
  //   console.log(name);
  // }, [registerDate, name]);

  const [registration, setRegistration] =
    useState<Registration>(registrationData);
  const [cart, setCart] = useState();

  useEffect(() => {
    const fetchPatientDetails = async (id: number) => {
      try {
        const { data: response } = await axios.get(
          `https://api-simrs.serpihantech.com/api/registrations/${inputId}`
        );
        setRegistration(response.data.registration);
        setCart(response.data.keranjang);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      }
    };

    if (inputId) {
      const registrationId = Number(inputId);
      if (!isNaN(registrationId)) {
        fetchPatientDetails(registrationId);
      } else {
        console.error("Invalid registration ID:", inputId);
        router.push("/error");
      }
    }
  }, [inputId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://api-simrs.serpihantech.com/api/patients"
        );
        setMedic(response.data[response.data.length - 1].id + 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateRegistration = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api-simrs.serpihantech.com/api/registrations/${id}`,
        {
          patient_id: medic || registration.patient_id,
          polyclinic_id: registration.polyclinic_id,
          doctor_id: registration.doctor_id,
          registration_date: registerDate || registration.registration_date,
          subjective: registration.subjective,
          objective: registration.objective,
          assessment: registration.assessment,
          plan: registration.plan,
          diagnosis: registration.diagnosis,
          already_paid: registration.already_paid,
        },
        {
          params: {
            patient_id: registration.patient_id,
            polyclinic_id: registration.polyclinic_id,
            doctor_id: registration.doctor_id,
            registration_date: registration.registration_date,
          },
        }
      );
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleUpdatePatient = async (id: number) => {
    try {
      const response = await axios.put(
        `https://api-simrs.serpihantech.com/api/patients/${id}`,
        {
          name: name || registration.patient.name,
          place_of_birth: birthPlace || registration.patient.place_of_birth,
          date_of_birth: birthDate || registration.patient.date_of_birth,
          gender: gender || registration.patient.gender,
          address: addressPatient || registration.patient.address,
          blood_type: bloodType || registration.patient.blood_type,
          insurance: insurance || registration.patient.insurance,
          pic_name: namePic || registration.patient.pic_name,
          pic_status: statusPic || registration.patient.pic_status,
          pic_address: addressPic || registration.patient.pic_address,
          allergy: allergy || registration.patient.allergy,
          disability: disability || registration.patient.disability,
        },
        {
          params: {
            name: registration.patient.name,
            place_of_birth: registration.patient.place_of_birth,
            date_of_birth: registration.patient.date_of_birth,
            gender: registration.patient.gender,
            phone_number: registration.patient.phone_number,
            address: registration.patient.address,
            blood_type: registration.patient.blood_type,
            insurance: registration.patient.insurance,
          },
        }
      );
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleCreatePatient = async () => {
    try {
      const response = await axios.post(
        `https://api-simrs.serpihantech.com/api/patients`,
        {
          name: name || registration.patient.name,
          place_of_birth: birthPlace || registration.patient.place_of_birth,
          date_of_birth: birthDate || registration.patient.date_of_birth,
          gender: gender || registration.patient.gender,
          address: addressPatient || registration.patient.address,
          blood_type: bloodType || registration.patient.blood_type,
          insurance: insurance || registration.patient.insurance,
          pic_name: namePic || registration.patient.pic_name,
          pic_status: statusPic || registration.patient.pic_status,
          pic_address: addressPic || registration.patient.pic_address,
          allergy: allergy || registration.patient.allergy,
          disability: disability || registration.patient.disability,
        },
        {
          params: {
            name: name || registration.patient.name,
            place_of_birth: birthPlace || registration.patient.place_of_birth,
            date_of_birth: birthDate || registration.patient.date_of_birth,
            gender: gender || registration.patient.gender,
            phone_number: "085700072350",
            address: addressPatient || registration.patient.address,
            blood_type: bloodType || registration.patient.blood_type,
            insurance: insurance || registration.patient.insurance,
          },
        }
      );
      localStorage.setItem("patientId", JSON.stringify(registration.patient));
      router.push("/registry");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  const handleUpdate = async (id: number, patient_id: number) => {
    try {
      handleUpdateRegistration(id);
      handleUpdatePatient(patient_id);
      localStorage.setItem("patientId", JSON.stringify(registration.patient));
      router.push("/registry");
    } catch (error) {
      console.error("Failed to post medicine details:", error);
    }
  };

  return (
    <div className="mx-4 flex justify-start items-center gap-4 ">
      <div className="w-full py-6 px-8 flex flex-col bg-basic-white rounded-2xl gap-6 border-2 overflow-y-visible">
        <div className="flex justify-start items-center text-body-sm cursor-pointer">
          <p
            className="text-gray-medium-light p-2"
            onClick={() => router.push("/registry")}
          >
            Registrasi Pasien{" "}
          </p>
          <ArrowRight2 size="16" className="text-gray-medium-light" />
          <p className="text-brand-40 p-2">Input RM</p>
        </div>

        <div className="submenu flex">
          <Button
            label="Input RM"
            variant="submenu-active"
            size="small"
            onClick={() => router.push("input")}
          />
          <Button
            label="Data Pasien"
            variant={inputId ? "submenu-disable" : "submenu"}
            size="small"
            onClick={inputId ? () => {} : () => router.push("patient")}
          />
        </div>

        <div className="flex justify-start items-center gap-x-20">
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="No Rekam Medis"
              type="number"
              onChange={(e) =>
                setMedic((registration.patient.id = Number(e.target.value)))
              }
              placeholder={inputId ? registration.patient.id.toString() : ""}
              name=""
              value={
                inputId ? registration.patient.id.toString() : medic.toString()
              }
            />
            <DatePicker
              title="Tanggal Pertama Daftar"
              name=""
              value={inputId ? registration.registration_date : registerDate}
              onDateChange={handleRegisterDate}
            />
            <Input
              label="Nama Pasien"
              type="text"
              onChange={(e) =>
                setName((registration.patient.name = e.target.value))
              }
              placeholder={inputId ? registration.patient.name : ""}
              name=""
              value={inputId ? registration.patient.name : name}
            />
            <div className="w-full flex gap-4">
              <Input
                label="Jenis Kelamin"
                type="select"
                onChange={(e) =>
                  setGender((registration.patient.gender = e.target.value))
                }
                placeholder={inputId ? registration.patient.gender : "Pilih"}
                name=""
                value={inputId ? registration.patient.gender : gender}
                options={["L", "P"]}
              />
              <Input
                label="Gol. Darah"
                type="select"
                onChange={(e) =>
                  setBloodType(
                    (registration.patient.blood_type = e.target.value)
                  )
                }
                placeholder={
                  inputId ? registration.patient.blood_type : "Pilih"
                }
                name=""
                value={inputId ? registration.patient.blood_type : bloodType}
                options={["A", "B", "O", "AB"]}
              />
            </div>
            <div className="w-full flex gap-4">
              <Input
                label="Tempat Lahir"
                type="text"
                onChange={(e) =>
                  setBirthPlace(
                    (registration.patient.place_of_birth = e.target.value)
                  )
                }
                placeholder={inputId ? registration.patient.place_of_birth : ""}
                name=""
                value={
                  inputId ? registration.patient.place_of_birth : birthPlace
                }
              />
              <DatePicker
                title="Tanggal Lahir"
                name=""
                value={inputId ? registration.patient.date_of_birth : null}
                onDateChange={handleBirthDate}
              />
            </div>
            <Input
              label="Alamat Pasien"
              type="text"
              onChange={(e) =>
                setAddressPatient(
                  (registration.patient.address = e.target.value)
                )
              }
              placeholder={inputId ? registration.patient.address : ""}
              name=""
              value={inputId ? registration.patient.address : addressPatient}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-y-4 w-full">
            <Input
              label="Jenis Asuransi"
              type="select"
              onChange={(e) =>
                setInsurance((registration.patient.insurance = e.target.value))
              }
              placeholder={inputId ? registration.patient.insurance : ""}
              name=""
              value={inputId ? registration.patient.insurance : insurance}
              options={["Umum", "BPJS", "Swasta"]}
            />
            <Input
              label="Alergi"
              type="text"
              onChange={(e) =>
                setAllergy((registration.patient.allergy = e.target.value))
              }
              placeholder={inputId ? registration.patient.allergy : ""}
              name=""
              value={inputId ? registration.patient.allergy : allergy}
            />
            <Input
              label="Kecacatan"
              type="text"
              onChange={(e) =>
                setDisability(
                  (registration.patient.disability = e.target.value)
                )
              }
              placeholder={inputId ? registration.patient.disability : ""}
              name=""
              value={inputId ? registration.patient.disability : disability}
            />
            <Input
              label="Nama Penanggung Jawab"
              type="text"
              onChange={(e) =>
                setNamePic((registration.patient.pic_name = e.target.value))
              }
              placeholder={inputId ? registration.patient.pic_name : ""}
              name=""
              value={inputId ? registration.patient.pic_name : namePic}
            />
            <Input
              label="Status Penanggung Jawab"
              type="select"
              onChange={(e) =>
                setStatusPic((registration.patient.pic_status = e.target.value))
              }
              placeholder={inputId ? registration.patient.pic_status : "Pilih"}
              name=""
              value={inputId ? registration.patient.pic_status : statusPic}
              options={["Diri Sendiri", "Ayah", "Ibu", "Saudara"]}
            />
            <Input
              label="Alamat Penanggung Jawab"
              type="text"
              onChange={(e) =>
                setAddressPic(
                  (registration.patient.pic_address = e.target.value)
                )
              }
              placeholder={inputId ? registration.patient.pic_address : ""}
              name=""
              value={inputId ? registration.patient.pic_address : addressPic}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            label="Batal"
            variant="secondary"
            size="small"
            onClick={() => router.push("/registry")}
          />
          <Button
            label="Simpan"
            variant="primary"
            size="small"
            onClick={
              inputId
                ? () => handleUpdate(registration.id, registration.patient_id)
                : () => handleCreatePatient()
            }
          />
        </div>
      </div>
    </div>
  );
}
