import axios from "axios"
export const signupHandler = async (username, number, email, password) => {
    try{
        const data = await axios.post(
            "http://localhost:3500/api/auth/register",
            {
                username: username, 
                number: number, 
                email: email, 
                password: password,
        }
    );
    console.log(data)
    } catch(err) {
        console.log("error adding to database")
    }
}