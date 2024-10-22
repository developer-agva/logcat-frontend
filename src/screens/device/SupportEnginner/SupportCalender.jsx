import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { getServicesDataAction } from '../../../store/action/ServiceEngAction';

function SupportCalender() {
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        const date = new Date(value);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        // Dispatch the action with the formatted date
        dispatch(getServicesDataAction(formattedDate));
    }, [value, dispatch]); // Depend on value and dispatch

    const handleClear = (e) => {
        e.preventDefault();
        let search = ''
        let filter = 'open'
        dispatch(getServicesDataAction(search, filter))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginTop: '-30px' }}>
            <button onClick={handleClear} style={{ cursor: 'pointer', backgroundColor: '#98004c', color: 'white', display: 'inline', width: '50px', height: '40px', borderRadius: '10px' }}>clear</button>
            <Calendar onChange={onChange} value={value} className='border-0'/>
        </div>
    );
}

export default SupportCalender;
