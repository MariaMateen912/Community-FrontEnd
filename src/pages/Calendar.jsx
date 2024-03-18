import React, { useState , useEffect} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        if (response.status === 200) {
          setEvents(response.data.events);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEvents();
  }, 
  []);




  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };
  const handleSelectedEvent =(event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  }
  const saveEvent = async () => {
    if (eventTitle && selectedDate) {
      const eventData = {
        title: eventTitle,
        start: selectedDate,
        end: moment(selectedDate).add(1, "hours").toDate(),
      };
  
      try {
        let response;
        if (selectEvent) {
          console.log(eventData);
          response = await axios.post(
            `http://localhost:3000/api/events/${selectEvent._id}`,
            eventData
          );
        
        //     else {
        //   response = await axios.post(
        //     "http://localhost:3000/api/events",
        //     eventData
        //   );
        // }
  
        if (response.data.success) {
          const updatedEvents = [...events];
          if (selectEvent) {
            const index = updatedEvents.findIndex(
              (event) => event._id === selectEvent._id
            );
            updatedEvents[index] = response.data.updatedEvent;
          } else {
            updatedEvents.push(response.data.event);
          }
        }
          setEvents(updatedEvents);
          setShowModal(false);
          setEventTitle("");
          setSelectEvent(null);
        } else {
          console.error("Failed to save event");
        }
      } catch (error) {
        console.error("Error:", error);
      
    }
    }
  };

  const deleteEvents = async () => {
    if (selectEvent) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/events/${selectEvent._id}`

        );
  
        if (response.data.success) {
          const updatedEvents = events.filter(
            (event) => event._id !== selectEvent._id
          );
          setEvents(updatedEvents);
          setShowModal(false);
          setEventTitle("");
          setSelectEvent(null);
        } else {
          console.error("Failed to delete event");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50' }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
      />
      {showModal && (
        <div
          className="modal"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1, // Add zIndex to make sure the modal appears above the calendar
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectEvent ? 'Edit Event': 'Add Event'}
                  </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                  {
                    setShowModal(false);
                    setEventTitle('');
                    setSelectEvent(null);
                    
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <label>Event Title</label> */}
                <input
                  type="text"
                  className="form-control"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                {selectEvent &&(
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={deleteEvents}
                >
                 Delete Events
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
  );
}

export default MyCalendar;