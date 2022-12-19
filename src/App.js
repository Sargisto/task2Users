import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormData } from "./components/form";
import { FilterData } from "./components/filter";
import { getUsers } from "./api/users";

import "./App.css";
import "./styles/pagination.css";

function App() {
  const [users, setUsers] = useState([]);
  const [usersPart, setUsersPart] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageId, setPageId] = useState(1);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    access: "",
    birthDate: ""
  });

  const getPage = (page, arr) => {
    const start = page === 1 ? 0 : Number(page - 1 + "0");
    const end = Number(page + "0");
    setUsersPart(arr.slice(start, end));
  };

  useEffect(() => {
    getUsers()
      .then((res) => {
        res.data.map(item => {
          item.access = item[`access`] ? "access" : "denied"
          return item
        })
        setUsers(res.data);
        getPage(1, res.data);
        setPageCount(Math.ceil(res.data.length / 10));
      })
      .catch((err) => console.error(err));
  }, []);

  const setPage = (page) => {
    setPageId(page);
    getPage(page, users);
  };

  const changeFormField = useCallback((key, value) => {
    setSelectedItem((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  const deleteUser = (userIndex) => {
    if (window.confirm("Are you sure?")) {
      setUsers(prevData => {
        prevData.splice(userIndex, 1);
        setPage(pageId);

        toast.error('User data deleted !', {
          position: toast.POSITION.TOP_RIGHT
        });

        return [...prevData];
      })
    }
  }

  useEffect(() => {
    setPageId(1);
    getPage(1, users);
  }, [users]);

  useEffect(() => setPageCount(Math.ceil(users.length / 10)), [users]);

  const searchUser = ({firstName, lastName, email, access, birthDate}) => {

    const filteredData = users.filter((data) => {
      let FN = firstName.trim();
      let LN = lastName.trim();
      let Email = email.trim();
      let Access = access.trim();
      let BD = birthDate.trim();
      if (
        (!FN || data.firstName === FN) &&
        (!LN || data.lastName === LN) &&
        (!Email || data.email === Email) &&
        (!Access || data.access === Access) &&
        (!BD || data.birthDate === BD)) {
        return data;
      } 
    });

    getPage(1, filteredData)
  }

  return (
    <div className="App">
      <h1>Users</h1>

      <FilterData searchUser={searchUser} />

      <div className="userBlock">
        <table id="users_table">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Access</th>
              <th>Birthdate</th>
              <th></th>
            </tr>
            {usersPart.map((data, index) => {
              return (
                <tr
                  key={data[`id`]}
                  className={selectedItem.id === data[`id`] ? "active" : ""}
                  onClick={() => setSelectedItem((prev) => data)}
                >
                  <td>{data[`firstName`]}</td>
                  <td>{data[`lastName`]}</td>
                  <td>{data[`email`]}</td>
                  <td>{data[`access`]}</td>
                  <td>{data[`birthDate`]}</td>
                  <td><button className="button button_Delete" onClick={() => deleteUser(index)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span onClick={() => setPage(1)}>&laquo;</span>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num, i) => {
          return (
            <span
              key={num}
              onClick={() => setPage(num)}
              className={pageId === num ? "active" : ""}
            >
              {num}
            </span>
          );
        })}
        <span onClick={() => setPage(pageCount)}>&raquo;</span>
      </div>
      <hr />
      <FormData selectedItem={selectedItem} changeFormField={changeFormField} setUsers={setUsers} setPage={setPage} pageId={pageId} />
      <ToastContainer />
    </div>
  );
}

export default App;
