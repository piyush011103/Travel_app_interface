import "./Auth.css"
import {useNavigate} from "react-router-dom"
import { validateNumber, validatePassword } from "../../utils"
import { loginHandler } from "../../services"
import { useAuth } from "../../Context";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {

    const {authDispatch, number, password} = useAuth()

    const navigate = useNavigate();

    const handleNumberChange = (event) => {
        isNumberValid = validateNumber(event.target.value);
        if (isNumberValid) {
            console.log("Valid Input");
            authDispatch({
                type: "NUMBER",
                payload: event.target.value
            })   
        }else{
            console.log("Invalid Number");
        }
    };

    const handlePasswordChange = (event) => {
        isPasswordValid = validatePassword(event.target.value);
        if (isPasswordValid) {
            console.log("Valid Input");
            authDispatch({
                type: "PASSWORD",
                payload: event.target.value
            })
        }else{
            console.log("Invalid Password");
        }
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isNumberValid && isPasswordValid) {
        try {
            const { accessToken, username } = await loginHandler(number, password);
            authDispatch({
                type: "SET_ACCESS_TOKEN",
                payload: accessToken,
            });
            authDispatch({
                type: "SET_USER_NAME",
                payload: username,
            });
        } catch (err) {
            console.error(err);
        }
    }
    authDispatch({
        type: "CLEAR_USER_DATA"
    });
    authDispatch({
        type: "SHOW_AUTH_MODAL"
    });
};

    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number <span className="asterisk">*</span>{" "}</label>
                    <input defaultValue={number} className="auth-input" type="number" maxLength="10" placeholder="Enter Mobile Number" required onChange={handleNumberChange}/>
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password <span className="asterisk">*</span>{" "}</label>
                    <input defaultValue={password} className="auth-input" placeholder="Enter Password" type="password" required onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor">Login</button>
                </div>
            </form>
            {/* <div>
                <button className="button btn-outline-primary cursor-pointer">
                    Login with Test Credentials
                </button>
            </div> */}
        </div>
    )
}