import { useState } from "react"
import { useNavigate} from 'react-router-dom'
import { Link} from 'react-router-dom'
import { loginAcc } from "../services/api"

import './css_styles/login_styles.css'

function Login_Page(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function HandleLogin(){
        try {
            const response = await loginAcc({ email, password });
            console.log("Signup Success:", response.data);
            alert(response.data.message);

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
            <div className="loginDesignDiv">
                <div className="loginTitleDiv">
                    <h1>Smart Scheduler</h1>
                    <p>Plan--Execute--Track</p>
                </div>

                <div className="loginUserInputDiv">
                    <div className="emailPasswordInputDiv">
                        <label htmlFor="emailTxtbx-id" className="emailLbl">Email</label>
                        <input 
                            id="emailTxtbx-id" 
                            className="emailTxtbx" 
                            type="email"                            
                            placeholder="Email" 
                            onChange={(e)=>setEmail(e.target.value)} />

                        <label htmlFor="passwordTxtbx-id" className="passwordLbl">Password</label>
                        <input 
                            id="passwordTxtbx-id" 
                            className="passwordTxtbx" 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e)=>setPassword(e.target.value)} />

                        <div className="forgotPasswordDiv">
                            <Link to="">Forgot password?</Link>
                        </div>
                    </div>
                        
                    <div className="loginSingupBtnDiv">
                        <button
                            id = "loginBtn-id"
                            className="loginBtn"
                            onClick={HandleLogin}>
                                Login
                            </button>
                        <p className="signupP">
                            Don't have an account? <Link to="./signin">Sign up</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login_Page