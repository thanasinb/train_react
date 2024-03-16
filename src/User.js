import { useContext } from "react"
import { MainContext } from "./main"

const User = () =>{
    const {setValid} = useContext(MainContext)
    return(
        <div>
            Valid
            <button onClick={()=>setValid(false)}>log out
            </button>
        </div>
    )
}

export default User