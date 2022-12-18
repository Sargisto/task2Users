import { useCallback, useEffect, useState } from "react";
import { FormData } from "./components/form";
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
    birthDate: "",
  });

  const getPage = (p, arr) => {
    const start = p === 1 ? 0 : Number(p - 1 + "0");
    const end = Number(p + "0");
    setUsersPart(arr.slice(start, end));
  };

  useEffect(() => {
    getUsers()
      .then((res) => {
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

  return (
    <div className="App">
      <h1>Users</h1>
      <div className="userBlock">
        <table id="users_table">
          <tbody>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>access</th>
              <th>birthDate</th>
            </tr>
            {usersPart.map((data) => {
              return (
                <tr
                  key={data[`id`]}
                  className={selectedItem.id === data[`id`] ? "active" : ""}
                  onClick={() => setSelectedItem((prev) => data)}
                >
                  <td>{data[`firstName`]}</td>
                  <td>{data[`lastName`]}</td>
                  <td>{data[`email`]}</td>
                  <td>{data[`access`] ? "access" : "denied"}</td>
                  <td>{data[`birthDate`]}</td>
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
        <span onClick={() => setPage(pageCount.length)}>&raquo;</span>
      </div>
      <hr />
      <FormData selectedItem={selectedItem} changeFormField={changeFormField} />
    </div>
  );
}

export default App;
