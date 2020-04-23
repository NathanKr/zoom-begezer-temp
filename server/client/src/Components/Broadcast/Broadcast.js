import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import DaysNav from './DaysNav';
import InstructorData from '../InstructorData/InstructorData';
import axios from 'axios';
import useToggle from '../../hooks/useTogggleState'
import './Broadcast.css'


function Broadcast() {
    const todayInNum = new Date().getDay()+1;
    const [eventsByDate, setEventsByDate] = useState([]);
    const [day, setDay] = useState(todayInNum) // 1 = Sunday 2 = Monday ... 6 = friday
    const [instructorData, setInstructorData] = useState('');
    const [instructorDataFlag, setInstructorDataFlag] = useToggle(false);
  
    const daysOftheWeekDate = (num = 0) =>{
      const curr = new Date();
      const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week 
      return new Date(curr.setDate(first + num)).toDateString();
    }

     const jsonData ='./data/Events.json';

        const changePage = (prevOrnext) => {
            if(prevOrnext === "next"){
                if (day <= 5) {
                 setDay(day+1) 
                }
            }else{
                if (day > 1) {
                    setDay(day-1) 
                   }
            }
        }

     const getInstractorData = (phone) => {
=         axios.get(`instructor-signup/${phone}`)
         .then(res =>{
             if(res.status === 200)
             {
              setInstructorData(res.data[0]);
              setInstructorDataFlag();
            }
            })
         .catch(err => console.log(err))
         
        
        }


useEffect(() => {
    const displayEventsByDate = (allEvents) =>{
        const selectedDay = Number(day);
        if (selectedDay === 1) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(0))
            setEventsByDate(filtterdEvents)
        }
        if (selectedDay === 2) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(1))
            setEventsByDate(filtterdEvents) 
        }

        if (selectedDay === 3) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(2))
            setEventsByDate(filtterdEvents)
        }
        if (selectedDay === 4) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(3))
            setEventsByDate(filtterdEvents)
        }
        if (selectedDay === 5) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(4))
            setEventsByDate(filtterdEvents)
        }
        if (selectedDay === 6) {
            let filtterdEvents = allEvents.filter(e => e.date === daysOftheWeekDate(5))
            setEventsByDate(filtterdEvents)
        }
   
    }

    const readJsonData =  () =>{
       fetch(jsonData)
        .then( (response) => {
        //   console.log(response);
           return response.json();
        })
        .then(data => {
          // Work with JSON data here
            displayEventsByDate(data)
        })
        .catch(err => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    }
    readJsonData()
    
    
}, [day, jsonData])

    
    return (
        <div className="Broadcast">
        {instructorDataFlag ? <InstructorData 
        data={instructorData} 
        close={setInstructorDataFlag} 
        /> :''}

                <h1>לוח שידורים</h1>
            {/* <button>לוח א</button>
            <button>לוח ב</button> */}
 
         <div className="Broadcast_table_wraper">
         <i className='fas fa-arrow-left' 
            id="next"
            onClick={(e)=>changePage(e.target.id)}
            >  
            </i>
            <i className='fas fa-arrow-right'
            id="prev"
            onClick={(e)=>changePage(e.target.id)}
            >
            </i>
              <DaysNav  
              day={day} 
              setDay={setDay}
              />
              
                <Table  bordered >
                    <thead>{/* // move table to diffrebt comp */}
                        <tr>
                            <th>שעה</th>
                            <th>נושא</th>
                            <th>שם המפעיל</th>
                            <th>מתאים לגיל</th>
                            <th>פעילות</th>
                            <th>מה להביא למפגש?</th>
                            <th>קישור לשידור</th>
                        </tr>
                    </thead>
                    <tbody>
                   {eventsByDate ? eventsByDate.map(e =>
                     (<tr key={e.id}>
                         <td>{e.startTime}</td>
                         <td onClick={()=>getInstractorData(e.phone)}
                         className="instructorName">
                             {e.presentor}
                        </td>
                         <td>{e.subject}</td>
                         <td>{e.ages}</td>
                         <td>{e.activity}</td>
                         <td>{e.requierments}</td>
                         <td><a 
                         className={
                            (Number(day) === todayInNum) && 
                            (Number(e.startTime.split(":")[0]) ===new Date().getHours()) ? "activeLink"
                            : 'disabledLink'
                           }   
                         onClick={(event) =>(
                             (Number(day) === todayInNum) && 
                             (Number(e.startTime.split(":")[0]) === new Date().getHours())
                         )
                          ? '': event.preventDefault()}
                          href={e.link}> הצטרף לשידור</a></td>
                     </tr>) 
                     ) 
                     : null
                     }
                    </tbody>
                </Table>
                </div>
        </div>
    )
}

export default Broadcast
