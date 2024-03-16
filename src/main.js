import './App.css';
import Login from './Login';
import User from './User';
import {createContext, useState, useEffect} from 'react';

export const MainContext = createContext(null)
function Main(){
    const [isValid, setValid] = useState(false)

    const checkValid = async () => {
        const validate = await fetch("http://localhost:3001/api/check", {
            credentials: "include"
        })
        .then((
            promise=>promise.json()
        .then((json)=>json)
        ))

        if(validate.result === "pass"){
            setValid(true)
        }else{
            setValid(false)
        }
    }

    useEffect(()=>{
        checkValid()
    }, [])

    return(
        <MainContext.Provider value={{isValid, setValid}}>
            {
                isValid?<User/>:<Login/>
            }
        </MainContext.Provider>
    );
}

export default Main;