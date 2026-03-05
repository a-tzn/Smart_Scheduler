import { useState } from "react"
import "./styles/calendar_styles.css"

function Calendar() {

    const [events, setEvents] = useState([])
    const [selectedEventId, setSelectedEventId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        type: "Meeting"
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleCreateClick() {
        setFormData({
            title: "",
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            type: "Meeting"
        })
        setIsEditing(false)
        setShowModal(true)
    }

    function handleSaveEvent() {
        if (!formData.title || !formData.date)
            return alert("Title and Date are required")

        if (isEditing) {
            const updated = events.map(ev =>
                ev.id === selectedEventId ? { ...formData, id: selectedEventId } : ev
            )
            setEvents(updated)
        } else {
            const newEvent = {
                ...formData,
                id: Date.now()
            }
            setEvents([...events, newEvent])
        }

        setShowModal(false)
        setSelectedEventId(null)
    }

    function handleEditClick() {
        if (!selectedEventId) return alert("Select an event first")

        const eventToEdit = events.find(ev => ev.id === selectedEventId)
        setFormData(eventToEdit)
        setIsEditing(true)
        setShowModal(true)
    }

    function handleDeleteClick() {
        if (!selectedEventId) return alert("Select an event first")

        const filtered = events.filter(ev => ev.id !== selectedEventId)
        setEvents(filtered)
        setSelectedEventId(null)
    }

    function handleEventClick(id) {
        setSelectedEventId(id)
    }

    // Simple 1-31 calendar
    const days = Array.from({ length: 31 }, (_, i) => i + 1)

    return (
        <div>
            <h2>Schedule</h2>

            <div className="taskActionBar">
                <button className="addTaskBtn" onClick={handleCreateClick}>
                    Create Event
                </button>

                <button className="editBtn" onClick={handleEditClick}>
                    Edit Event
                </button>

                <button className="deleteBtn" onClick={handleDeleteClick}>
                    Remove Event
                </button>
            </div>

            <div className="calendarGrid">
                {days.map(day => {
                    const dayEvents = events.filter(
                        ev => new Date(ev.date).getDate() === day
                    )

                    return (
                        <div key={day} className="dateCell">
                            <strong>{day}</strong>

                            {dayEvents.map(ev => (
                                <div
                                    key={ev.id}
                                    onClick={() => handleEventClick(ev.id)}
                                    className={
                                        selectedEventId === ev.id
                                            ? "calendarEvent selectedEvent"
                                            : "calendarEvent"
                                    }
                                >
                                    {ev.title}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>

            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>{isEditing ? "Edit Event" : "Create Event"}</h3>

                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />

                        <label>Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                        />

                        <label>End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        <label>Event Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option>Meeting</option>
                            <option>Personal</option>
                            <option>School</option>
                            <option>Work</option>
                            <option>Other</option>
                        </select>

                        <div className="modalButtons">
                            <button onClick={handleSaveEvent} className="addTaskBtn">
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

export default Calendar