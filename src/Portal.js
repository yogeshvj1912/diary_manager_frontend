import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Portal() {
    const navigate=useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [holidays,setHolidays]=useState([])

 

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  useEffect(() => {
    fetchEvents();
    fetchHoliday()
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://diary-w5bq.onrender.com/events",{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      });
      
      const parsedEvents = response.data.map(holiday => ({
        ...holiday,
        date: new Date(holiday.date)
      }));
      setEvents(parsedEvents);
    } catch (error) {
      console.log(error);
    }
  };



  const fetchHoliday = async () => {
    try {
      const response = await axios.get("https://diary-w5bq.onrender.com/holiday");
      
      const parsedEvents = response.data.map(event => ({
        ...event,
        date: new Date(event.date)
      }));
      setHolidays(parsedEvents);
    } catch (error) {
      console.log(error);
    }
  };




  const addEvent = async () => {
    const newEvent = {
      date: selectedDate,
      title: newEventTitle
    
    };
    console.log(selectedDate)
    try {
      await axios.post("https://diary-w5bq.onrender.com/event", newEvent,{
        headers:{
          Authorization:`${window.localStorage.getItem("token")}`
        }
      });
      setNewEventTitle("");
      setShowModal(false);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };


  let handleDelete=async(id)=>{
   
    try {
        const confirmData=window.confirm("Are you sure do you want to delete this data");

       if (confirmData){
       
        await axios.delete(`https://diary-w5bq.onrender.com/event/${id}`)
    setShowModal(false)
        fetchEvents();
       }
     }
     catch (error) {
        
        alert("Somthing went wrong");
       
     }

}

 

 // Get the first day of the month
 const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Get the number of days in the month
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get the current year
const getYear = (date) => {
  return date.getFullYear();
};

// Get the current month
const getMonth = (date) => {
  return date.getMonth();
};

// Get the current day
const getDay = (date) => {
  return date.getDate();
};

// Check if a date is today
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Check if a date is selected
const isSelected = (date) => {
 
  return (
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear()
    
  );
  
};

// Change the month
const changeMonth = (value) => {
  const newDate = new Date(currentMonth);

  newDate.setMonth(newDate.getMonth() + value);

  setCurrentMonth(newDate);
};



// Select a date
const selectDate = (date) => {
  setSelectedDate(date);
  setShowModal(true);
};
  return (
   <div className="body">
     <div className="main">
     <nav id="logout">
<button  onClick={()=>{
                      window.localStorage.removeItem("token");
                      navigate("/")
                    }} className="logout">Logout</button>
</nav>

    <div className="heading">
      <button onClick={() => changeMonth(-1)}>Prev</button>
      <div id="months">
        {months[getMonth(currentMonth)]} {getYear(currentMonth)}
      </div>
      <button onClick={() => changeMonth(1)}>Next</button>
    </div>
    <div className="weekday">
      {daysOfWeek.map((day, index) => (
        <div key={index}>{day}</div>
      ))}
    </div>
    <div id="calendar">
      {[...Array(getFirstDayOfMonth(getMonth(currentMonth), getYear(currentMonth)))].map((x, index) => (
        <div key={`empty-${index}`} className="empty-days"></div>
      ))}
      {[...Array(getDaysInMonth(getMonth(currentMonth), getYear(currentMonth)))].map((x, index) => {
        const date = new Date(getYear(currentMonth), getMonth(currentMonth), index + 1);
      
        return (
          <div
            key={`day-${index}`}
            className={`day ${isToday(date) ? "today" : ""} ${isSelected(date) ? "selected" : ""}`}
            
            onClick={() => selectDate(date)} >{isToday(date)}
           <div className="day-holiday">  
           <span className="days">{index + 1}</span>

 {holidays.map((holiday, holidayIndex) => {
 
 if (
   holiday.date.getDate() === date.getDate() &&
   holiday.date.getMonth() === date.getMonth() &&
   holiday.date.getFullYear() === date.getFullYear()
 ) {
   return (
     <div
       key={`holiday-${holidayIndex}`}
       className="holiday"
       >

       {holiday.title}
     
     </div>
   );
 }
 return null;
})}
           </div>

           <div className="events-main">
         


             {events.map((event, eventIndex) => {
             
             if (
               event.date.getDate() === date.getDate() &&
               event.date.getMonth() === date.getMonth() &&
               event.date.getFullYear() === date.getFullYear()
             ) {
               return (
                 <div
                   key={`event-${eventIndex}`}
                   className={`event ${event.title.toLowerCase() === "holiday" ? "holiday" : ""}`}
                   // onClick={() => viewEvent(eventIndex)}
                   onClick={()=>{
                     handleDelete(event._id)
                    
                   }} 
                   
                 >

                   {event.title}
                 
                 </div>
               );
             }
             return null;
           })}</div>
          </div>
        );
      })}
    </div>
    {showModal && (
      <div id="modal">
        <div id="addEvent">
          <h2>Add Event</h2>
          <input
           autoComplete="off"
            type="text"
            id="txtTitle"
            placeholder="Event Title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <button id="btnSave" onClick={addEvent}>
            Save
          </button>
          <button className="btnClose" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
             </div>
    )}
  </div>
   </div>
  )
}

export default Portal


