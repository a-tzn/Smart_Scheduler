function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>

            <div className="cardsContainer">
                <div className="card">
                    <h3>Upcoming Tasks</h3>
                    <p>5 Tasks</p>
                </div>

                <div className="card">
                    <h3>Events Today</h3>
                    <p>2 Events</p>
                </div>

                <div className="card">
                    <h3>Completed</h3>
                    <p>12 Tasks</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard