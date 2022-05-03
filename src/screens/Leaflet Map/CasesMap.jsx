import React, { useEffect, useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet'; // External library to display country wise covid cases in map marker popup.

const CasesMap = () => {

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

    // To prevent side effects
    useEffect(() => {
        // Function call on first render.
        fetchCasesData();
    }, [])

    return (

        apiError ? <div className='fs-2'> <i className="bi bi-bug-fill fs-2"></i> {apiError} </div> :
            casesData.length ?
                <MapContainer center={[20, 77]} zoom={5} scrollWheelZoom={false} >
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {casesData.map((eachCase) => (
                        <Marker position={[eachCase.countryInfo.lat, eachCase.countryInfo.long]} key={eachCase.country}>
                            <Popup className='fs-6'>
                                <div className='text-center'> <b className='fs-5 text-uppercase'>{eachCase.country} </b></div>
                                <hr className='my-2 ' />
                                Active: {eachCase.active}  <br />
                                Recovered: {eachCase.recovered}  <br />
                                Deaths: {eachCase.deaths}
                            </Popup>
                        </Marker>))}
                </MapContainer>
                : <div className='fs-2'> <i className="bi bi-arrow-clockwise fs-2"></i> Loading ...</div>
    )
}

export default CasesMap;