import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Style from "../../css/SearchBar.module.css";
import ReactReadMoreReadLess from "react-read-more-read-less";

const NurseGoverDataGlobal = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading,setloading]=useState(false)
    const maxList = 500;
    const handleChange = async (event) => {
        setQuery(event.target.value);
        if (event.target.value === '') {
            setResults([]); // Clear results if input is empty
            return;
        }
        setloading(true)
        try {
            const response = await axios.get(`https://clinicaltables.nlm.nih.gov/api/icd9cm_dx/v3/search?terms=${query}&maxList=${maxList}`, { tableFormat: true, valueCols: [0], colHeaders: ['Code', 'Name'] });
            setResults(response.data[3]); // Update state with fetched results
            setloading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleKeyPress = (event) => {
        event.preventDefault();
        setQuery(event.target.textContent)
        const selectedValue = event.target.textContent;
        const selectedItem = results?.find(result => `${result[1]}` === selectedValue);
        if (selectedItem && !selectedItems.some(item => item[0] === selectedItem[0])) {
            setSelectedItems([...selectedItems, selectedItem]); // Add item to selectedItems array
        }
        setQuery(''); // Clear the input field after selection
    };
    props.onData(selectedItems);
    return (
        <div>
            <lable for="diagnose" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Admiting diagnose</lable>
                <input
                    list="data"
                    type="text"
                    autoComplete='off'
                    placeholder="Enter illness or ICD9 code"
                    value={query}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                />
            
            {selectedItems?.length>0?
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                {selectedItems?.map((item, index) => (
                    <span key={index}>{item.join(' ')}</span>
                ))}
            </div>
            :''}
            {query?.length>0 && results?.length> 0 ?
            <section className={Style.search_section}>
                <div className={Style.search_result}>
                    {results?.map((item, index) => (
                        <span  id="clickable-span" onClick={handleKeyPress} data-value="your-value" key={index} target='_blank' className={Style.search_suggestion_line}>
                            {item[1]}
                        </span>
                    ))}
                    {loading===true && <span className={Style.search_suggestion_line}>
                           Loading...
                        </span>}
                </div>
            </section>
             :''} 
        </div>
    )
};

export default NurseGoverDataGlobal