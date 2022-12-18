import './App.css';
import './styles/pagination.css';
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FormData } from './components/form';

function App() {
  const [users, setUsers] = useState([]);
  const [usersPart, setUsersPart] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [pageId, setPageId] = useState(1);
  const [selectedItem, setSelectedItem] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    access: '',
    birthDate: ''
  });


  
  const getPage = (p) => {
    const start = p === 1 ? 0 : Number(p - 1 + '1');
    const end = p === 1 ? Number(p + '0') : Number(p + '1');
    setUsersPart(users.slice(start, end));
  }

  useEffect(() => {
    axios.get(`https://retoolapi.dev/eqsQ4S/users`)
      .then(res => {
        let arr = [];
        for (let i = 0; i < Math.ceil(res.data.length / 10); i++) {
          arr.push(i + 1);
        }
        setPageCount(arr);
        setUsers((arr) => res.data);
      });
  }, []);

  useEffect(() => {
    getPage(1);
  }, [users])

  const setPage = (page) => {
    setPageId(page);
    getPage(page);
  }

  const chaneFormField = (key, value) => {
    console.log(key, value);
    setSelectedItem(prevState => ({...prevState, [key]: value}))
  }

  return (
    <Fragment>
      <div className="App">
        <h1>Users</h1>
        <div className='userBlock'>
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
                  <tr key={data[`id`]} className={selectedItem.id === data[`id`] ? "active" : ""}  onClick={() => setSelectedItem(prev => data)}>
                    <td>{data[`firstName`]}</td>
                    <td>{data[`lastName`]}</td>
                    <td>{data[`email`]}</td>
                    <td>{data[`access`] ? 'access' : 'denied'}</td>
                    <td>{data[`birthDate`]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        <div className="pagination">
          <span onClick={() => setPage(1)}>&laquo;</span>
          {pageCount.map((num, i) => {
            return (
              <span key={num} onClick={() => setPage(num)} className={pageId === num ? "active" : ""} >{num}</span>
            )
          })}
          <span onClick={() => setPage(pageCount.length)}>&raquo;</span>
        </div>
        <hr />

        <FormData selectedItem={selectedItem} chaneFormField={chaneFormField}/>

      </div>
    </Fragment>
  );
}

export default App;
