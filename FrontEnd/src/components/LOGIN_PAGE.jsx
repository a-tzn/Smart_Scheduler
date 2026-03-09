import { useState } from "react"
import { replace, useNavigate} from 'react-router-dom'
import { Link} from 'react-router-dom'
import { loginAcc } from "../services/api"
import { useEffect } from "react"

import './css_styles/login_styles.css'

function Login_Page(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect (() => {
        const token = localStorage.getItem("token");
        const account_id = localStorage.getItem("account_id");
        if(token){
            navigate("/Home", {replace: true});
        }
    }, []);

    async function HandleLogin(){
        try {
            const response = await loginAcc({ email, password });
            if (response.data.access){
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("account_id", response.data.account_id);
                navigate("/Home/Dashboard")
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.detail);
            } else {
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
                            Don't have an account? <Link to="./Signin">Sign up</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login_Page