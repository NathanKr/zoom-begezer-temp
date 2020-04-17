import React from 'react'
import './InstructorData.css'

function InstructorData({ data,close  }) {
    console.log(data);
    
    return (
        <div className="InstructorData">
            <strong onClick={close}>סגור חלון</strong>
            <h3> קצת עליי</h3>
            <h4>אני {data.firstName} {data.lastName} </h4>
            <p>{data.about}</p>
        </div>
    )
}

export default InstructorData
               