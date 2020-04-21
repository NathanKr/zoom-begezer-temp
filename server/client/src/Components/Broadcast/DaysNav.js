import React from 'react'
import { Nav } from 'react-bootstrap';
import './DaysNav.css'

function DaysNav({ day, setDay }) {
    const changeDay = (e) => {
        let newDay = Number(e);
        setDay(newDay)
    }
   const selectedDayCondition = (num) => day === num ? 'selectedDay' : '';

    return (
        <Nav className="justify-content-center DaysNav">
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={selectedDayCondition(1)}
                    eventKey={1}>ראשון</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={selectedDayCondition(2)}
                    eventKey={2}>שני</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={selectedDayCondition(3)}
                    eventKey={3}>שלישי</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={selectedDayCondition(4)}
                    eventKey={4}>רביעי</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={ selectedDayCondition(5) }
                    eventKey={5}>חמישי</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onSelect={changeDay}
                    className={selectedDayCondition(6)}
                    eventKey={6}>שישי</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            </Nav.Item>
        </Nav>
    )
}

export default DaysNav
