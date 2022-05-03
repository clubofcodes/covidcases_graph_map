import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react'

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

    useEffect(() => {
        fetchCasesData();
    }, [])

    return (

        <MapContainer center={[20, 77]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {casesData.map((eachCase) => (
                <Marker position={[eachCase.countryInfo.lat, eachCase.countryInfo.long]}>
                    <Popup>
                        Name: {eachCase.country} <br />
                        Active Cases: {eachCase.active}  <br />
                        Recovered Cases: {eachCase.recovered}  <br />
                        Deaths: {eachCase.deaths}
                    </Popup>
                </Marker>))}
        </MapContainer>
    )
}

export default CasesMap