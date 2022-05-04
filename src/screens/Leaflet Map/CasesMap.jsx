import React, { useEffect } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet'; // External library to display country wise covid cases in map marker popup.
import { covidCasesApi, indiaCoords } from '../../config'; // Imported static environment variables.
import { useApiFetch } from '../../Hooks/useApiFetch'; // Imported custom hook to fetch API data.

const CasesMap = () => {

    //using custom hook and it's variables for fetching data from api call.
    const { casesData, apiError, fetchCasesData } = useApiFetch(covidCasesApi);

    // To prevent side effects
    useEffect(() => {
        // Function call on first render.
        fetchCasesData();

        //eslint-disable-next-line
    }, [])

    return (

        apiError ? <div className='fs-2'> <i className="bi bi-bug-fill fs-2"></i> {apiError} </div> :
            casesData.length ?
                <MapContainer center={[indiaCoords.lat, indiaCoords.long]} zoom={5} scrollWheelZoom={false} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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