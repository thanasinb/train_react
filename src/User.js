import { useContext } from "react"
import { MainContext } from "./main"

const User = () =>{
    const {setValid} = useContext(MainContext)
    return(
        <div>
            Valid
            <button onClick={ async ()=>{
                await fetch("http://localhost:3001/api/logout", {
                    credentials: "include"
                })
                setValid(false)
            }}>log out
            </button>
        </div>
    )
}

export default User