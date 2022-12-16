import '../styles/form.css';

export const FormData = (props) => {
    const selectedItem = props.selectedItem;
    const chaneFormField = props.chaneFormField;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedItem, 1111111);
        
      }
    return (
        <>
        <div className='editForm'>
          <div className='editForm_group'>
            <h4>Update data</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" value={selectedItem.firstName} onChange={(e) => chaneFormField('firstName', e.target.value)} name="firstname" placeholder="First name.." />
              <input type="text" value={selectedItem.lastName} onChange={(e) => chaneFormField('lastName', e.target.value)} name="lastname" placeholder="Last name.." />
              <input type="text" value={selectedItem.email} onChange={(e) => chaneFormField('email', e.target.value)} name="email" placeholder="Email.." />
              <input type="text" value={selectedItem.access} onChange={(e) => chaneFormField('access', e.target.value)} name="access" placeholder="Access.." />
              <input type="text" value={selectedItem.birthDate} onChange={(e) => chaneFormField('birthDate', e.target.value)} name="birthDate" placeholder="Date of Birth.." />

              <button className="button_Save">Save</button>
            </form>
          </div>
        </div>
        </>
    )
}