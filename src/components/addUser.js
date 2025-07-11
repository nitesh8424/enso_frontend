import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', dob: '' });
    const { error, setError } = useState();
    const navigate = useNavigate();
    const onChangeValue = (value, field) => {
        if (field === 'dob') {
            const date = value.split('-')
            const formatDate = `${date[2]}-${date[1]}-${date[0]}`
            value = formatDate;
        }
        setFormData(prev => ({ ...prev, [field]: value }))
    }
    const updateLocalStorage = async() => {
        const updatedData = [];
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        updatedData.push(...userData, formData)
        console.log('...updatedData',updatedData)
        localStorage.setItem('userData', JSON.stringify(updatedData));
    }
    const saveUserData = async() => {
        console.log('formData', formData)
        try {
            const addUser = await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, formData)
            if (addUser.data.success) {
                await updateLocalStorage();
                navigate('/displayPage')
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div className="App">
            <header className="">
                <p> ADD USER DATA </p>
            </header>
            <div style={{ textAlign: 'left', width: '300px', margin: 'auto', backgroundColor: 'lightyellow', padding: '10px 10px 10px 10px' }}>
                <p> First Name : <input style={{ float: 'right', height: '20px' }} type='text' onChange={e => onChangeValue(e.target.value, 'firstName')} /> </p>
                <span> {error?.name && error?.name} </span>
                <p> Last Name : <input style={{ float: 'right', height: '20px' }} type='text' onChange={e => onChangeValue(e.target.value, 'lastName')} /> </p>
                <span> {error?.father_name && error?.father_name} </span>
                <p> DOB : <input style={{ float: 'right', height: '20px' }} type='date' onChange={e => onChangeValue(e.target.value, 'dob')} /> </p>
                <span> {error?.name && error?.name} </span>
            </div>
            <button style={{cursor:'pointer'}} onClick={() => saveUserData()}>Submit</button>
        </div>
    );

}

export default AddUser;
