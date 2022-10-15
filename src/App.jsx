import "./App.css";
import { FaUserCog, FaUserPlus } from "react-icons/fa";
import Modal from "./Components/Modal";
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "./config/API";
import ModalUpdate from "./Components/ModalUpdate";
import ConfirmModal from "./Components/ConfirmModal";
import DetailModal from "./Components/DetailModal";

function App() {
  const [query, setQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState();

  let { data: users, refetch } = useQuery("users", async () => {
    const response = await API.get("/users");
    return response.data;
  });

  // console.log(users?.filter((user) => user.name.toLowerCase().includes(query)));

  let handleDelete = (id) => {
    setConfirm(!confirm);
    setId(id);
  };

  let handleDetail = (id) => {
    setDetail(!detail);
    setId(id);
  };

  let handleUpdate = async (id) => {
    setUpdate(!update);
    setId(id);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // seacrh NIK]]

  const [q, setQ] = useState("");
  const [searchParam] = useState(["nik", "name"]);
  function searchTerm(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  // console.log(q);
  let daata;
  let usernik;
  if (users?.length > 0) {
    daata = Object.values(users);
    usernik = searchTerm(daata);
  }
  console.log(usernik);

  return (
    <>
      {detail && <DetailModal id={id} age={getAge} setModal={setDetail} />}
      {confirm && (
        <ConfirmModal
          confirm={confirm}
          setConfirm={setConfirm}
          del={del}
          setDel={setDel}
          id={id}
          refetch={refetch}
        />
      )}
      {modal && <Modal modal={modal} setModal={setModal} />}
      {update && <ModalUpdate id={id} update={update} setUpdate={setUpdate} />}
      <div className="p-7">
        <h1 className="flex items-center gap-3 font-bold text-2xl">
          <FaUserCog size={50} /> Aplikasi Data Pribadi
        </h1>
        <div className="flex flex-col gap-7 bg-orange-200 px-6 py-10 mt-7 rounded-xl">
          <div className="flex flex-col ">
            <label htmlFor="nik">NIK</label>
            <input
              id="nik"
              type="number"
              placeholder="search..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-blue-500 w-full md:w-96 px-4 py-2"
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="search..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-blue-500 w-full md:w-96 px-4 py-2"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="flex justify-end m-4">
          <button
            className="flex items-center gap-2 bg-blue-700 text-white px-8 py-2 rounded-lg  hover:bg-orange-800"
            onClick={() => setModal(!modal)}
          >
            <FaUserPlus size={20} /> Add
          </button>
        </div>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  nik
                </th>
                <th scope="col" className="py-3 px-6">
                  nama lengkap
                </th>
                <th scope="col" className="py-3 px-6">
                  umur
                </th>
                <th scope="col" className="py-3 px-6">
                  tanggal lahir
                </th>
                <th scope="col" className="py-3 px-6">
                  jenis kelamin
                </th>
                <th scope="col" className="py-3 px-6">
                  alamat
                </th>
                <th scope="col" className="py-3 px-6">
                  negara
                </th>
                <th scope="col" className="py-3 px-6">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {query ? (
                users
                  ?.filter((asd) => asd.name.toLowerCase().includes(query))
                  .map((item, key) => (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6">{item.nik}</td>
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6">{getAge(item.date)}</td>
                      <td className="py-4 px-6">{item.date}</td>
                      <td className="py-4 px-6">{item.gender}</td>
                      <td className="py-4 px-6 w-44">{item.address}</td>
                      <td className="py-4 px-6">{item.country}</td>
                      <td className="py-4 px-6 flex flex-row items-center gap-2">
                        <div
                          className="cursor-pointer text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                          onClick={() => handleDetail(item.nik)}
                        >
                          Detail
                        </div>
                        <div
                          className="cursor-pointer text-yellow-500 hover:text-yellow-600 font-semibold hover:underline"
                          onClick={() => handleUpdate(item.nik)}
                        >
                          Edit
                        </div>
                        <div
                          className="cursor-pointer text-red-500 hover:text-red-600 font-semibold hover:underline"
                          onClick={() => handleDelete(item.nik)}
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))
              ) : usernik?.length > 0 ? (
                usernik?.map((item, k) => (
                  <tr
                    key={k}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{item.nik}</td>
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{getAge(item.date)}</td>
                    <td className="py-4 px-6">{item.date}</td>
                    <td className="py-4 px-6">{item.gender}</td>
                    <td className="py-4 px-6 w-44">{item.address}</td>
                    <td className="py-4 px-6">{item.country}</td>
                    <td className="py-4 px-6 flex flex-row items-center gap-2">
                      <div
                        className="cursor-pointer text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                        onClick={() => handleDetail(item.nik)}
                      >
                        Detail
                      </div>
                      <div
                        className="cursor-pointer text-yellow-500 hover:text-yellow-600 font-semibold hover:underline"
                        onClick={() => handleUpdate(item.nik)}
                      >
                        Edit
                      </div>
                      <div
                        className="cursor-pointer text-red-500 hover:text-red-600 font-semibold hover:underline"
                        onClick={() => handleDelete(item.nik)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <div>DATA YANG ANDA CARI KOSONG</div>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
