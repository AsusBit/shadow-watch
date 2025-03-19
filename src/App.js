import './App.css';
import { useState, useEffect, useRef, useMemo } from 'react'
import MapComponent from './components/MapComponent';
import FormModal from './components/FormModal';
import CrimeCard from './components/CrimeCard';
function App() {
  // NEXT STEPS
  // phone optimization
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [error, setError] = useState()
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [enableSelect, setEnableSelect] = useState(false)
  const [formData, setFormData] = useState({
      crimeType: '',
      description: '',
    });


   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;  
      const updatedData = {"crimes": [
        ...data['crimes'], 
        {
        "id": data["crimes"].length+1,
        "report_details": formData.description,
        "crime_type": formData.crimeType,
        "latitude": lat,
        "longitude": lng,
        "report_date_time": formattedDate,
        "report_status": "Pending" }
    ]
}
      setData(updatedData);
localStorage.setItem("data", JSON.stringify(updatedData));
console.log(localStorage.getItem("data"))

      setEnableSelect(false)
      setShowConfirm(false)
    };

    useEffect(()=>{
      const storedData = localStorage.getItem("data")
      if (storedData){
        setData(JSON.parse(storedData))
        setLoading(false)
      } else {
      const fetchData = async () => {
      try{
        const response = await fetch('/data.json')
        if (!response.ok){
          throw new Error("An error has occurred while fetching.")
        }
        const result = await response.json();
        setData(result);
        if (!storedData){
          localStorage.setItem("data", JSON.stringify(data));
        }
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }


      fetchData()
  }
  }, [])

  // Filter crimes based on search input
  const filteredCrimes = useMemo(() => {
    if (!data.crimes) return [];
    
    return data.crimes.filter((crime) => 
      crime.id.toString().includes(search) ||
      crime.crime_type.toLowerCase().includes(search.toLowerCase()) || 
      crime.report_date_time.includes(search)
    );
  }, [data.crimes, search]);

  const markerRefs = useRef({}); // Store references to markers

  // Function to open a popup programmatically
  const openPopup = (crimeId) => {
    const marker = markerRefs.current[crimeId];
    if (marker) {
      marker.openPopup();
    }
  };

  const [showModal, setShowModal] = useState(false)

  if (loading) return <>Loading...</>
  if (error){
    return <>Error: {error.message}</>
  }


  
  // only shows confirm location when lat and lng have a location
  return ( 
    <div>
      <h1 className="font-silkscreen text-center font-bold text-city-white text-7xl ">City<span className="text-city-bright-red">X</span></h1>
      <h2 className="font-silkscreen text-city-white text-center text-5xl">SERVER1 | RIHAL</h2>
      <div className="bg-city-blue w-[80%] flex h-[40rem] shadow-inner-xl place-self-center my-10">

        
        {/* map area */}
        <div className="flex items-center justify-center w-[50%] z-0 p-2 flex-col relative">
        {enableSelect === true && <p className='font-silkscreen text-city-white'>Select Location Of The Crime</p>}
        <MapComponent setShowConfirm={setShowConfirm} showConfirm={showConfirm} setEnableSelect={setEnableSelect} enableSelect={enableSelect} crimes={filteredCrimes} markerRefs={markerRefs} lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>
        {showConfirm && <button  onClick={handleSubmit} className='px-4 py-2 bg-city-ocean text-city-white font-silkscreen rounded'>Confirm Location</button>}
        </div>

    <div className="px-10 py-2 w-[50%] ">
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search crimes" className="w-full rounded bg-city-white h-[2rem] p-1 font-silkscreen"></input>
        {/* search, crimes and report area */}
        <div className='bg-city-blue w-full p-5 h-[80%] my-3 shadow-inner-xl overflow-y-scroll scroll-smooth space-y-2'>
          {filteredCrimes.map((crime)=>(
            <CrimeCard 
              key={crime.id}
              func={() => openPopup(crime.id)} 
              type={crime.crime_type} 
              latitude={crime.latitude} 
              longitude={crime.longitude} 
              status={crime.report_status}
            />
          ))}
        </div>
        <button onClick={()=>setShowModal(true)} className='bg-city-red font-silkscreen text-white px-5 py-3 active:bg-red-600 duration-75 ease-in-out rounded'>
            Report Crime
        </button>
       
        </div>
      </div>
      
      {showModal && <FormModal setEnableSelect={setEnableSelect} formData={formData} setFormData={setFormData} onClose={()=> setShowModal(false)}/>}
    </div>
  );
}

export default App;
