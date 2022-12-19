import '../styles/form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormData = (props) => {
  const selectedItem = props.selectedItem;
  const changeFormField = props.changeFormField;
  const setUsers = props.setUsers;
  const setPage = props.setPage;
  const pageId = props.pageId;

  const saveNewData = (event) => {
    event.preventDefault();
    setUsers(prevData => {
      prevData.map((data, i, arr) => {
        if (data.id === selectedItem.id) {
          arr[i] = selectedItem;
        }
        return data;
      });
      setPage(pageId);

      toast.info('You have updated a user !', {
        position: toast.POSITION.TOP_RIGHT
    });
      return [...prevData];
    });
  }

  const createNewUser = (event) => {
    event.preventDefault();
    selectedItem.id = (new Date().getTime()).toString();
    setUsers(prevData => {
      prevData.push(selectedItem);
      setPage(pageId);

      toast.success('You updated the user !', {
          position: toast.POSITION.TOP_RIGHT
      });
      return [...prevData];
    });
  }

  return (
    <>
      <div className='editForm'>
        <div className='editForm_group'>
          <h4>Update data</h4>
          <form >
            <input type="text" value={selectedItem.firstName} onChange={(e) => changeFormField('firstName', e.target.value)} name="firstname" placeholder="First name.." />
            <input type="text" value={selectedItem.lastName} onChange={(e) => changeFormField('lastName', e.target.value)} name="lastname" placeholder="Last name.." />
            <input type="text" value={selectedItem.email} onChange={(e) => changeFormField('email', e.target.value)} name="email" placeholder="Email.." />
            <input type="text" value={selectedItem.access} onChange={(e) => changeFormField('access', e.target.value)} name="access" placeholder="Access.." />
            <input type="text" value={selectedItem.birthDate} onChange={(e) => changeFormField('birthDate', e.target.value)} name="birthDate" placeholder="Date of Birth.." />

            <button className={`button button_Save ${selectedItem.id ? '' : 'disabled'} `}
              id={`${selectedItem.id ? '' : 'disabled'}`} onClick={saveNewData}
              disabled={!selectedItem.id}>Save</button>

            <button className="button button_Create" onClick={createNewUser}>Create</button>
          </form>
        </div>
      </div>
    </>
  )
}