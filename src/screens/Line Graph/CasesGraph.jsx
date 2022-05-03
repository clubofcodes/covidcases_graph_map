import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
//dummy data for line chart.
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 460, pv: 2400, amt: 2400 }];

const CasesGraph = () => {

    //new state variable to store data or error.
    const [casesData, setCasesData] = useState([]);
    const [apiError, setApiError] = useState(null);

    //arrow function to get data from api and store in state variable.
    const fetchCasesData = async () => fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then((resData) => {
            setCasesData(resData);
            setApiError(null);
        }, (error) => setApiError(error.message));

    useEffect(() => {
        //function call on first render.
        fetchCasesData()
    }, [])

    // console.log(casesData.slice(0,3));

    return (
        apiError ? <div> {apiError} </div> :
            casesData.length ?
                <ResponsiveContainer width="100%" aspect={2.5}>
                    <LineChart data={casesData.slice(0, 20)} width={500} height={300} margin={{ top: 5, right: 30, bottom: 5, left: 40 }} >
                        <CartesianGrid stroke="white" strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="cases" stroke="red" dot={{ r: 5 }} activeDot={{ stroke: 'white', strokeWidth: 2, r: 8 }} strokeWidth={2} />
                        <XAxis dataKey="country" interval={0} minTickGap={0} tickSize={15} allowDataOverflow={true} angle='300' />
                        <YAxis />
                        <Legend />
                        <Tooltip contentStyle={{ backgroundColor: 'white', color: 'black' }} />
                    </LineChart>
                </ResponsiveContainer>
                : <div> Loading ...</div>
    )
}

export default CasesGraph;