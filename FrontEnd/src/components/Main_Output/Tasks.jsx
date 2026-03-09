import { useState, useEffect } from "react"
import { createTask, updateTask, getTasks, deleteTask } from "../../services/api"
import "./styles/tasks_styles.css"

function Tasks() {

    const [tasks, setTasks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null)

    const [formData, setFormData] = useState({
        title: "",
        objective: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
        status: "Pending"
    })

    useEffect(() => {

        const loadTasks = async () => {

            const account_id = localStorage.getItem("account_id")

            if (!account_id) return

            try {

                const res = await getTasks(account_id)

                setTasks(res.data)

            } catch (err) {
                console.log("Failed to load tasks")
            }
        }

        loadTasks()

    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleCreateClick() {
        setFormData({
            title: "",
            objective: "",
            startDate: "",
            endDate: "",
            priority: "Medium",
            status: "Pending"
        })
        setIsEditing(false)
        setShowModal(true)
    }

    async function handleSaveTask() {
        if (!formData.title) return alert("Title is required")

        const account_id = localStorage.getItem("account_id")

        if (isEditing) {

            try {

                await updateTask(selectedTaskId, {
                    title: formData.title,
                    objective: formData.objective,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    priority: formData.priority,
                    status: formData.status
                })

                const updatedTasks = tasks.map(task =>
                    task.id === selectedTaskId
                        ? { ...formData, id: selectedTaskId }
                        : task
                )

                setTasks(updatedTasks)

            } catch (err) {
                alert("Update failed")
            }

        }else {
            try {

                await createTask(account_id, formData)

                const newTask = {
                    ...formData,
                    id: Date.now()
                }
                setTasks([...tasks, newTask])

                setShowModal(false)
                setSelectedTaskId(null)

            } catch (error) {
                alert("Failed to create task")
            }
            
        }

        setShowModal(false)
        setSelectedTaskId(null)
    }

    function handleEditClick() {
        if (!selectedTaskId) return alert("Select a task first")

        const taskToEdit = tasks.find(task => task.id === selectedTaskId)
        setFormData(taskToEdit)
        setIsEditing(true)
        setShowModal(true)
    }

    async function handleDeleteClick() {
        if (!selectedTaskId) return alert("Select a task first")
        const confirmed = window.confirm("Are you sure you want to delete this task?")
        if (confirmed) {
            try {
                await deleteTask(selectedTaskId)
                const remainingTasks = tasks.filter(task => task.id !== selectedTaskId)
                setTasks(remainingTasks)
            } catch (error) {
                alert("Failed to delete task")
            }
            setSelectedTaskId(null)
        }
    }

    function handleRowClick(id) {
        setSelectedTaskId(id)
    }

    return (
        <div>
            <h2>Tasks</h2>

            <div className="taskActionBar">
                <button className="addTaskBtn" onClick={handleCreateClick}>
                    Create Task
                </button>

                <button className="editBtn" onClick={handleEditClick}>
                    Edit Task
                </button>

                <button className="deleteBtn" onClick={handleDeleteClick}>
                    Delete Task
                </button>
            </div>

            <table className="taskTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Objective</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr
                            key={task.id}
                            onClick={() => handleRowClick(task.id)}
                            className={selectedTaskId === task.id ? "selectedRow" : ""}
                        >
                            <td>{task.title}</td>
                            <td>{task.objective}</td>
                            <td>{task.startDate}</td>
                            <td>{task.endDate}</td>
                            <td>{task.priority}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>{isEditing ? "Edit Task" : "Create Task"}</h3>

                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="objective"
                            placeholder="Task Objective"
                            value={formData.objective}
                            onChange={handleChange}
                        />

                        <label>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />

                        <label>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />

                        <label>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        <div className="modalButtons">
                            <button onClick={handleSaveTask} className="addTaskBtn">
                                Confirm
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="cancelBtn"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tasks