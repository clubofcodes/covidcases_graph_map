import React, { useEffect, useState } from 'react'
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'; // Charting library used to show covid cases in line graph.
import { covidCasesApi, limitCountry } from '../../config'; // Imported default environment variables.
import { useApiFetch } from '../../Hooks/useApiFetch'; // Imported custom hook to fetch API data.

const CasesGraph = () => {
    // Filter state to change the number country to display in line chart.
    const [filterCountry, setFilterCountry] = useState(limitCountry);

    //using custom hook and it's variables for fetching data from api call.
    const { casesData, apiError, fetchCasesData } = useApiFetch(covidCasesApi);

    // To prevent side effects
    useEffect(() => {
        // Function call on first render.
        fetchCasesData();

        // eslint-disable-next-line
    }, [])

    return (
        apiError ? <div className='fs-2'> <i className="bi bi-bug-fill fs-2"></i> {apiError} </div> :
            casesData.length ?
                <div className='d-flex flex-column align-items-center mb-5'>
                    <div className='country_number'>
                        <p>Type any number of country to display in graph (Only number is valid)</p>
                        <input type="number" className='mb-4' name="country_number" placeholder='Enter number . . . .(Default: 25)' onChange={(e) => (e.target.value === '') ? setFilterCountry(limitCountry) : setFilterCountry(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()} />
                    </div>
                    <ResponsiveContainer width="65%" aspect={2.5}>
                        <LineChart data={casesData.slice(0, filterCountry)} margin={{ top: 5, right: 80, bottom: 5, left: 40 }} >
                            <CartesianGrid stroke="#dbdbdb" strokeDasharray="3 3" />
                            <Line type="natural" legendType='square' dataKey="cases" stroke="#2f70a8" dot={{ r: 4 }} activeDot={{ stroke: 'black', strokeWidth: 2, r: 9 }} strokeWidth={3} />
                            <XAxis dataKey="country" interval={0} minTickGap={0} tickSize={60} allowDataOverflow={true} angle='420' />
                            <YAxis />
                            <Legend />
                            <Tooltip contentStyle={{ backgroundColor: 'white', color: 'black' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                : <div className='fs-2'> <i className="bi bi-arrow-clockwise fs-2"></i> Loading ...</div>
    )
}

export default CasesGraph;