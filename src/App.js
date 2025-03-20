import './App.css';
import { useState, useEffect, useRef, useMemo } from 'react'
import MapComponent from './components/MapComponent';
import FormModal from './components/FormModal';
import CrimeCard from './components/CrimeCard';
function App() {
  // NEXT STEPS
  // phone optimization
  // category-based filtering, allowing users to show/hide specific crime types.
  // min width that the text can handle is 1400 with full words and icons
  // min width 1235px with only icons
  // min 684px before card starts breaking: hence you should put the map below
  const [data, setData] = useState({ crimes: [] })
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
      const updatedData = {
        crimes: [
          ...(data.crimes || []),
          {
            id: (data.crimes || []).length + 1,
            report_details: formData.description,
            crime_type: formData.crimeType,
            latitude: lat,
            longitude: lng,
            report_date_time: formattedDate,
            report_status: "Pending"
          }
        ]
      };
      setData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
      console.log(localStorage.getItem("data"));

      setEnableSelect(false);
      setShowConfirm(false);
    };

    useEffect(() => {
      const storedData = localStorage.getItem("data");
      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else {
        const fetchData = async () => {
          try {
            // Try multiple possible paths for data.json
            const possiblePaths = [
              '/data.json',
              './data.json',
              'data.json',
              '/shadow-watch/data.json'
            ];

            let response = null;
            let result = null;

            for (const path of possiblePaths) {
              try {
                response = await fetch(path);
                if (response.ok) {
                  result = await response.json();
                  console.log(`Successfully fetched data from ${path}`);
                  break;
                }
              } catch (e) {
                console.warn(`Failed to fetch from ${path}:`, e);
                continue;
              }
            }

            if (!result) {
              throw new Error("Could not fetch data from any location");
            }

            setData(result);
            localStorage.setItem("data", JSON.stringify(result));
          } catch (e) {
            console.error("Data fetching error:", e);
            setError(e);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }, []);

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


  

  return ( 
    <div className='grid sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-1/2 sm:translate-x-1/2'>
    <h1 className="font-silkscreen text-center font-bold text-city-white text-5xl sm:text-7xl w-[100vw]">City<span className="text-city-bright-red">X</span></h1>
    <h2 className="font-silkscreen text-city-white text-center text-3xl sm:text-5xl">SERVER1 | RIHAL</h2>
    <div className="bg-city-blue w-[95%] sm:w-[80%] block mapbr:flex flex-col mapbr:flex-row h-auto mapbr:h-[40rem] shadow-inner-xl place-self-center my-10">

      {/* search, crimes and report area */}
      <div className="px-2 mapbr:px-10 py-2 w-full mapbr:w-[50%]">
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search crimes" className="w-full rounded bg-city-white h-[2rem] p-1 font-silkscreen"></input>
        
        <div className='bg-city-blue w-full p-5 h-[20rem] mapbr:h-[80%] my-3 shadow-inner-xl overflow-y-scroll scroll-smooth space-y-2'>
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
        <button onClick={()=>setShowModal(true)} className='bg-city-red font-silkscreen text-white px-5 py-3 active:bg-red-600 duration-75 ease-in-out rounded mb-4 mapbr:mb-0'>
            Report Crime
        </button>
      </div>
      
      {/* map area */}
      <div className="flex items-center justify-center w-full mapbr:w-[50%] z-0 p-2 flex-col relative h-[20rem] mapbr:h-auto">
        {enableSelect === true && <p className='font-silkscreen text-city-white'>Select Location Of The Crime</p>}
        <MapComponent setShowConfirm={setShowConfirm} showConfirm={showConfirm} setEnableSelect={setEnableSelect} enableSelect={enableSelect} crimes={filteredCrimes} markerRefs={markerRefs} lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>
        {showConfirm && <button onClick={handleSubmit} className='px-4 py-2 bg-city-ocean text-city-white font-silkscreen rounded'>Confirm Location</button>}
      </div>
    </div>
    
    {showModal && <FormModal setEnableSelect={setEnableSelect} formData={formData} setFormData={setFormData} onClose={()=> setShowModal(false)}/>}
  </div>
  );
}

export default App;
