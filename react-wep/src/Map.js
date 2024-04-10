import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import 'react-dropdown/style.css';

import  {db, storage} from './backend/firebase_config'
import { getDocs, collection, doc , addDoc , deleteDoc , updateDoc } from "firebase/firestore"

import './Components/Project/SearchPlace.css'
import './Map.css'
import Sidebarcustomer from './Components/Project/sidebar/Sidebarcustomer';
import MapShowDetails from './Components/Project/MapShowDetails';

function Map() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [locations,setLocations] = useState([]);
  const [dropdownSearchValue, setDropdownSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  
  const dropdownRef = useRef()
  const [center,setCenter] = useState({
    lat: 44.0000,
    lng: -80.0000
  });

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [editMode])


  const [data, setData] = useState([])
  const detailCollectionRef = collection(db, "Garage")
  useEffect(()=>{
    console.log('call data')
    const loadAllGarage = async () =>{
      try {
        console.log('try')
        const d = await getDocs(detailCollectionRef);
        const filteredData = d.docs.map((doc)=>({
            ...doc.data(), 
            id: doc.id
        }));
        setData(filteredData)
        console.log('data',filteredData)

      }catch(err){
          console.error(err);
      }
    }
    loadAllGarage()
  },[])


  const [all,setAll] = useState([])
  useEffect(() => {
    const setAllGarage = () => {
      const allName = data.map((item) => {
        return {lat: parseFloat(item.lat),
                lng: parseFloat(item.lng),
                id:  item}
      });
      console.log('all lat/lng : ',allName);
      setLocations(allName);
    };
    setAllGarage();
  }, [data]);

  const skillSelectionHandler = skill => {
    const place = data.find((item)=>{
      return item.name==skill;
    })
    console.log(place)
    setSelectedSkill(place)
    const la = parseFloat(place.lat);
    const ln = parseFloat(place.lng);
    setCenter({lat:la,lng:ln})
    setDropdownSearchValue("")
    setEditMode(false)
  }

  const filteredSkills = data
    .filter(item => item.name.match(new RegExp(dropdownSearchValue, "i")))
    .map(item => item.name)
  // console.log(data)

  const getIconColor = place =>{
    switch (place.status){
      case 0 :
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 1 :
        return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 2 :
        return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 3 :
        return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
  }

  const onMarkerClick=(location)=>{
    console.log('click marker, ',location);
    setDetails(location);
    setShowDetails(!showDetails);
    console.log(showDetails)
    // console.log('details, ',details)
  };

  useEffect(()=>{
    console.log('details, ' ,details)
  },[details])
  return (
    <div>
      <LoadScript
      googleMapsApiKey="AIzaSyDkcryxVThtiuv2tyH7ucHeDv6uQUHATaI"
      >
        <Sidebarcustomer/>
        {showDetails && <MapShowDetails details={details} onClose={onMarkerClick}/>}  
        <div className="s-container">
          {editMode ? (
            <div ref={dropdownRef} className="dropdown-wrapper">
              <input
                className="dropdown-input"
                name="dropdown-input"
                autoFocus
                onChange={e => setDropdownSearchValue(e.target.value)}
                value={dropdownSearchValue}
              />
              <div className="dropdown-list">
                <ul>
                  {filteredSkills.map(skill => {
                    return (
                      <li key={skill} onClick={() => skillSelectionHandler(skill)}>
                        {skill}{" "}
                      </li>
                    )
                  })}
                  {filteredSkills.length === 0 && (
                    <li className="no-result">ไม่พบสถานที่</li>
                  )}
                </ul>
              </div>
            </div>
        ) : (
          <input
            className='dropdown-search'
            onFocus={() => setEditMode(true)}
            placeholder="ค้นหาสถานที่"
          />
        )}
        </div>
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={15}
        >
          {locations.map((location, index) => (
            <Marker 
              key={index} 
              position={{lat: location.lat, lng: location.lng}} 
              icon={
                getIconColor(location.id)}
              onClick={(()=>onMarkerClick(location.id))}/>
          ))}
          
        </GoogleMap> 
         
      </LoadScript>
    </div>

  )
}

export default React.memo(Map)