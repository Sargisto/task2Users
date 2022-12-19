import { useCallback, useState } from "react";
import '../styles/filter.css';

export const FilterData = ({ searchUser }) => {

    const [filterData, setFilterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        access: "",
        birthDate: ""
    });

    const changeFilterField = useCallback((key, value) => {
        setFilterData((prevState) => ({ ...prevState, [key]: value }));
    }, []);

    const searchItem = (event) => {
        event.preventDefault();
        searchUser(filterData);
    }

    return (
        <div className="filter_block">
            <form className="filter_block__form">
                <input type="text" value={filterData.firstName} onChange={(e) => changeFilterField('firstName', e.target.value)} name="firstName" placeholder="Search by first name" />
                <input type="text" value={filterData.lastName} onChange={(e) => changeFilterField('lastName', e.target.value)} name="lastName" placeholder="Search by last name" />
                <input type="text" value={filterData.email} onChange={(e) => changeFilterField('email', e.target.value)} name="email" placeholder="Search by email" />
                <input type="text" value={filterData.access} onChange={(e) => changeFilterField('access', e.target.value)} name="access" placeholder="Search by access" />
                <input type="text" value={filterData.birthDate} onChange={(e) => changeFilterField('birthDate', e.target.value)} name="birthDate" placeholder="Search by birthdate " />
                <button className="button button_Search" onClick={searchItem}>Search</button>
            </form>
        </div>
    )
}