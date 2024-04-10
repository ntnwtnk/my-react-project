import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete} from '@react-google-maps/api';
// import 'react-dropdown/style.css';

// import  {db, storage} from './backend/firebase_config'
// import { getDocs, collection, doc , addDoc , deleteDoc , updateDoc } from "firebase/firestore"

import './PinLocation.css'
const libraries = ["places"];

function PinLocation(){
    // static libraries = ["places"];
    const [currentPosition, setCurrentPosition] = useState({});
    const [clickedPosition, setClickedPosition] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => { // ใช้ getCurrentPosition() เพื่อรับพิกัดปัจจุบัน
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
    }, []);

    const handleClick = (event) => {
        setClickedPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
        setIsSelected(true);
        
    };

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setSelectedPlace({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
            setCurrentPosition({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
        } else {
          console.log('Autocomplete is not loaded yet!');
        }
    };

    useEffect(() =>{
        console.log('selected position : ',clickedPosition)
    },[clickedPosition])

    return(
        <div>
            <LoadScript 
                googleMapsApiKey="AIzaSyDkcryxVThtiuv2tyH7ucHeDv6uQUHATaI"
                libraries={libraries}    
            >
                <GoogleMap
                    mapContainerClassName="pinmap-container"
                    center={currentPosition} // กำหนดตำแหน่งศูนย์กลางของแผนที่จาก currentPosition
                    zoom={15}
                    onClick={handleClick}
                    >
                    {isSelected && <Marker position={clickedPosition} />}
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="ค้นหาสถานที่"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `350px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </Autocomplete>
                </GoogleMap>
                <button disabled={!isSelected} className='confirm-location'>ปักหมุด</button>
            </LoadScript>
        </div>
    )
}
export default PinLocation