import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayPage() {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate();
    const dobToAge = (dob) => {
        const currentYear = new Date().getFullYear();
        const dobYear = dob?.slice(6, 12);
        return currentYear - dobYear;
    }
    const fetchRandomImage = async () => {
        try {
            const randomImage = await axios.get(process.env.REACT_APP_RANDOM_IMAGE_URL, {
                timeout: 10 * 1000, // 10 seconds
             });
            console.log('randomImage',randomImage?.data)
            return randomImage?.data?.message;
            // return 'https://media.geeksforgeeks.org/gfg-gg-logo.svg'
        } catch (error) {
            console.log('error while image fetch : ', error)
        }
    }
    const updateLocalStorage = async (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    useEffect(() => {
        const fetcData = async () => {
            let localData;
            try {
                  const fetchUsers = await axios.get(`${process.env.REACT_APP_API_URL}/api/user` , {
                   timeout: 10 * 1000, // 10 seconds
                  });
                  localData = fetchUsers.data;
                  updateLocalStorage(localData)
                  if(localData?.length===0){
                    localData = JSON.parse(localStorage.getItem('userData'));
                  }
                  //else{
                  //const updatedUser = await Promise.all(
                    //localData.map(async (user) => {
                        //const res = await fetchRandomImage();
                      //  return { ...user, profilePhoto: res };
                  //  })
                  // );
                //updateLocalStorage(updatedUser);
                  //}
                setUserData(localData);
            } catch (error) {
                console.log('fetch error', error);
                setUserData(localData)
            }
        }
        fetcData();
    }, [])

    return (
        <>
            {userData.length === 0 ? (<p>Loading users .... </p>) :
                (<div className="App" style={{ marginBottom: '20px' }}>
                    <header className="">
                        <img src="back_arrow.png" width={'30px'} style={{ position: 'absolute', left: '50px', cursor: 'pointer' }} alt="Go Back" onClick={() => navigate('/')} />
                        <b><p> PROFILE CARDS </p></b>
                    </header>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', scrollBehavior: 'auto', justifyContent: 'center' }}>
                        {userData && userData?.map((element, index) =>
                            <div key={index} style={{ padding: '10px 10px 10px 10px', display: 'flex', width: '400px', flexDirection: 'row', backgroundColor: 'lightskyblue' }}>
                                <div style={{ height: '150px', width: '150px', backgroundColor: 'yellow', border: '1px solid black' }}>
                                    <img style={{ width: '130px', height: '130px', padding: '10px 10px 10px 10px', display: 'flex', justifyItems: 'center', justifyContent: 'center' }}
                                        src={element.profilePhoto}
                                        alt="new" >
                                    </img>
                                </div>
                                <div style={{ marginLeft: '20px', textAlign: 'left' }}>
                                    <p> First Name : {element.firstName}</p>
                                    <p> Last Name : {element.lastName}</p>
                                    <p> DOB : {element.dob}</p>
                                    <p> Age : {dobToAge(element.dob)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
        </>
    );
}

export default DisplayPage;
