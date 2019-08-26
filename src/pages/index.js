import React,{ useState, useEffect } from 'react'
import AutoComplete  from '../components/SearchBar/SearchBar';
import DaysList  from '../components/DaysList/DaysList';
import axios from 'axios'

const Index = () => {

   
    const [city, setCity] = useState('');
    return (
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <AutoComplete {...{setCity}} />
            <DaysList {...{city}}/>
        </div>
    )
}

export default Index