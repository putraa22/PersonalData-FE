import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { API } from "../config/API";

export default function ModalUpdate({ id, setUpdate }) {
  let { data: user1 } = useQuery("user2", async () => {
    const response = await API.get("/users/" + id);
    return response.data;
  });
  console.log(id);
  const [form, setForm] = useState({
    nik: id,
    name: "",
    gender: "",
    date: "",
    address: "",
    country: "",
  });
  useEffect(() => {
    if (user1) {
      setForm({
        ...form,
        name: user1?.name,
        gender: user1?.gender,
        date: user1?.date,
        address: user1?.address,
        country: user1?.country,
      });
    }
  }, [user1]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/users", form);
      alert("berhasil mengubah data");
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <div className="w-full h-full bg-slate-500 opacity-50 fixed z-20"></div>
      <div className="bg-slate-200 centered w-[90%] md:w-[35rem] z-50 rounded-lg px-4 py-8 ">
        <div className="text-2xl font-bold mb-3 text-orange-600 flex gap-2 items-center">
          <FaUserPlus size={30} /> Ubah Data
        </div>
        <form className="mt-6" onSubmit={(e) => handleSubmit.mutate(e)}>
          <label htmlFor="nik">NIK</label>
          <input
            id="nik"
            type="number"
            name="nik"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            placeholder="Masukan NIK"
            onChange={handleChange}
            disabled
            value={form.nik}
            required
          />
          <label htmlFor="name">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            placeholder="Masukan Nama Lengkap"
            onChange={handleChange}
            value={form.name}
            required
          />
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="pb-2">
              Jenis Kelamin
            </label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="Laki-Laki"
                onChange={handleChange}
                checked={form.gender === "Laki-Laki"}
              />
              <label htmlFor="male" className="ml-3 mr-5">
                Laki-Laki
              </label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="Perempuan"
                onChange={handleChange}
                checked={form.gender === "Perempuan"}
              />
              <label htmlFor="female" className="ml-3">
                Perempuan
              </label>
            </div>
          </div>
          <label htmlFor="alamat">Alamat</label>
          <textarea
            name="address"
            id="alamat"
            className="bg-white rounded-md border-none focus:outline-orange-600 p-3 w-full h-40"
            placeholder="Masukan Alamat"
            onChange={handleChange}
            value={form.address}
            required
          ></textarea>
          <label htmlFor="date"> Tanggal Lahir</label>
          <input
            type="date"
            id="date"
            name="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            onChange={handleChange}
            value={form.date}
            required
          />
          <label htmlFor="country" className="pb-2">
            Negara
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            name="country"
            id="country"
            onChange={handleChange}
            value={form.country}
            required
          >
            <option value="" selected disabled>
              -- Pilih Negara --
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapura">Singapura</option>
            <option value="Thailand">Thailand</option>
            <option value="Amerika">Amerika</option>
            <option value="Jepang">Jepang</option>
            <option value="China">China</option>
          </select>

          <button
            type="submit"
            className="w-full m-auto py-2 bg-orange-600 hover:bg-orange-600 rounded-md font-bold text-white mb-3"
          >
            {" "}
            Simpan{" "}
          </button>
          <button
            className="w-full m-auto py-2 bg-white border border-orange-600 rounded-md font-bold text-orange-600 hover:bg-transparent"
            onClick={() => setUpdate(false)}
          >
            {" "}
            Kembali{" "}
          </button>
        </form>
      </div>
    </>
  );
}
