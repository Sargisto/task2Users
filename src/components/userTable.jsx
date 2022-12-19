
export const UserTable = ({ usersPart, selectedItem, setSelectedItem, deleteUser }) => {
    return (
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
    )
}