import axios from "axios";

export const loginHandler = async (number, password) => {
    try{
        const {data: accessToken, username} = await axios.post("http://localhost:3500/api/auth/login",{
            number: number,
            password: password
        })
        console.log({accessToken, username});
        return {accessToken, username};        
    }catch(err){
        console.log("unable to login")
    }
}