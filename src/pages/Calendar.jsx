import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = async () => {
    const eventData = {
      title: eventTitle,
      start: selectedDate,
    };
    const response = await axios.post(
      "http://localhost:3000/api/auth/events",
      eventData
    );
    console.log(response.data.event._id);
    const id = response.data.event._id;

    const getresponse = await axios.post(
      "http://localhost:3000/api/auth/getevents",
      id
    );
  };

  const deleteEvent = async () => {
    try {
      if (selectEvent) {
        const response = await axios.delete(`/api/events/${selectEvent._id}`);
        if (response.data.success) {
          const updatedEvents = events.filter(
            (event) => event._id !== selectEvent._id
          );
          setEvents(updatedEvents);
          setShowModal(false);
          setEventTitle("");
          setSelectEvent(null);
        } else {
          console.error("Failed to delete event:", response.data.error);
          // Display error message to the user
          alert("Failed to delete event. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Display error message to the user
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <>
      <Header />
      <div style={{ height: "500px", marginTop: "10px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: "50" }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectedEvent}
        />
        {showModal && (
          <div
            className="modal"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectEvent ? "Edit Event" : "Add Event Name"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      setEventTitle("");
                      setSelectEvent(null);
                    }}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  {selectEvent && (
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={deleteEvent}
                    >
                      Delete Event
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveEvent}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyCalendar;
