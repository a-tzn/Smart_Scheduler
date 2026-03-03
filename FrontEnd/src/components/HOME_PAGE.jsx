import { Outlet, useNavigate } from 'react-router-dom'
import "./css_styles/home_styles.css"

function Home_Page() {
    const navigate = useNavigate()

    function HandleLogout(){
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <div className="homeContainer">

            <div className="headerDiv">
                <h1 className="logo">My Scheduler</h1>
                <div className="userSection">
                    <span>Welcome, User</span>
                    <button className="logoutBtn" onClick={HandleLogout}>Logout</button>
                </div>
            </div>

            <div className="bodyContainer">

                <div className="sidePanelDiv">
                    <div 
                        className="navItem"
                        onClick={() => navigate('Dashboard')}
                    >
                        Dashboard
                    </div>

                    <div 
                        className="navItem"
                        onClick={() => navigate('Calendar')}
                    >
                        Calendar
                    </div>

                    <div 
                        className="navItem"
                        onClick={() => navigate('Tasks')}
                    >
                        Reports
                    </div>
                </div>

                <div className="mainContentDiv">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Home_Page