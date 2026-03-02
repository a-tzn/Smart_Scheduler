import { useState } from "react"
import { useNavigate} from 'react-router-dom'
import "./css_styles/signup_styles.css"
import { createAcc } from "../services/api";

function Signup_Page(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function HandleGoBack(){
        navigate("/");

    }

    async function HandleSignin(){
        try {
            const response = await createAcc({ username, email, password });
            alert(response.data.message);
            navigate("/"); // back to login
        } catch (error) {
            if (error.response) {
                // Backend returned a response (like 400)
                alert(error.response.data.detail); // show backend message
            } else {
                // Network or CORS error
                alert("Server not reachable");
            }
        }
    }

    return(
        <div className="backgroundDiv">
            <div className="signinDesignDiv">
                <div className="signinTitleDiv">
                    <h1>Smart Scheduler</h1>
                    <p>Create Account</p>
                </div>

                <div className="signinUserInputDiv">
                    <div className="usernameemailPasswordInputDiv">
                        <input 
                            id="usernameTxtbx-id" 
                            className="usernameTxtbx" 
                            type="text" 
                            placeholder="Username" 
                            onChange={(e)=>setUsername(e.target.value)} />

                        <input 
                            id="emailTxtbx-id" 
                            className="emailTxtbx" 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e)=>setEmail(e.target.value)} />

                        <input 
                            id="passwordTxtbx-id" 
                            className="passwordTxtbx" 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e)=>setPassword(e.target.value)} />

                        <div className="showFrgtPassDiv">
                            <input 
                                id="showPasswordChkbk-id" 
                                className="showPassWordChkbx"
                                type="checkbox" /> Show password
                        </div>
                    </div>

                    <div className="backSigninBtnDiv">
                        <button
                            id = "backBtn-id"
                            className="backBtn"
                            onClick={HandleGoBack}>
                                Back to Login
                            </button>

                        <button
                            id = "signinBtn-id"
                            className="signinBtn"
                            onClick={HandleSignin}>
                                Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup_Page