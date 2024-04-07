import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      console.log("Stored events:", storedEvents);
      try {
        const parsedEvents = JSON.parse(storedEvents);
        console.log("Retrieved events from local storage:", parsedEvents);
        const formattedEvents = parsedEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error parsing retrieved events:", error);
      }
    } else {
      console.log("No events found in local storage.");
    }
  }, []);

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
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        console.log(updatedEvent);
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        console.log(newEvent);
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = [...existingEvents, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        setEvents(updatedEvents);
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }

    const eventData = {
      title: eventTitle,
      start: selectedDate,
    };
    const response = await axios.post(
      "http://localhost:3000/api/auth/events",
      eventData
    );
    console.log(response.data.event._id);
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
      <div style={{ height: "500px", marginTop: "30px" }}>
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
