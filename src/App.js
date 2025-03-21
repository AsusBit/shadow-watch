import './App.css';
import { useState, useEffect, useRef, useMemo } from 'react'
import MapComponent from './components/MapComponent';
import FormModal from './components/FormModal';
import CrimeCard from './components/CrimeCard';
function App() {

  // this project Shadow-Watch was made to protect CityX from the criminal mongrels that lie within the roads of our beautiful virtual city.
  // our job is to identify, locate, and report, the sightings of any crime within the city. So it would be handled accordingly.
  // the webapp supports:
  // dynamic search index features for crimes
  // map features
  // report features
  // display of all crimes in cards so you can get a full view of what's bugging CityX
  // PWA support
  // LocalStorage support for persistent data
  // Mobile responsiveness for all the phone users :)
  // full resposiveness for all UI components, no overlaps or glitches
  // full Vercel deployment
  // Made with ♥️ by Hamzah AlNofli

  const [data, setData] = useState({ crimes: [] }) // init the varible that'll hold all crimes 
  const [loading, setLoading] = useState(true) // well, loading!
  const [search, setSearch] = useState("") // this is used for the search bar feature's content
  const [error, setError] = useState() // an error handler variable
  const [lat, setLat] = useState(null) // latitide for the new reported crime's location when created
  const [lng, setLng] = useState(null)  // longitude for the new reported crime's location when created
  const [showConfirm, setShowConfirm] = useState(false) // handles display the confirmation button for confirming location of new crime
  const [enableSelect, setEnableSelect] = useState(false) // handles ability to pick a location within the map when reporting a new crime
  const [formData, setFormData] = useState({
      crimeType: '',
      description: '',
    }); // takes the data from the FormModal to use it when reporting a new crime

 

    // handles submission of a new crime report
   const handleSubmit = (e) => {
      e.preventDefault();
      const now = new Date(); // today's date
      // made to format the date and time exactly how it is formatted in the data.json file, avoiding conflicts later on.
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;  
      // this was made to handle localStorage correctly, as setState isn't the quickest way to TAKE data from to save it locally
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
      localStorage.setItem("data", JSON.stringify(updatedData)); // autosaving to local data when submitting new crime report
      setEnableSelect(false); // disabling ability to pick place in the map --no more need!
      setShowConfirm(false); // removing the display of confirmation button for choosing a place in the map --again, no more need!
    };


    // this useEffect is made to automatically either fetch data from data.json, or from the localStorage
    useEffect(() => {
      const storedData = localStorage.getItem("data");
      // if localstorage isn't empty, means it has the data we want, so we fetch from it
      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else { // otherwiswe, local storage is empty so we're new to the webapp, we fetch from static data.json
        const fetchData = async () => {
          try {
            // trying multiple possible paths for data.json in avoidance of errors
            const possiblePaths = [
              '/data.json',
              './data.json',
              'data.json',
              '/shadow-watch/data.json'
            ];

            let response = null;
            let result = null;
            // for loop made to loop through any possible path data.json might be placed in, and fetches from it
            for (const path of possiblePaths) {
              try {
                response = await fetch(path);
                if (response.ok) {
                  result = await response.json(); // if it finds it in one of the paths, it saves it into app's json and stops the loop
                  break;
                }
              } catch (e) {
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

        fetchData(); // calls the function made inside the useEffect, for it to take effect lol
      }
    }, []);

  // made to filter crimes based on search input, uses useMemo to not rerender the search on every minimal change in the DOM, --performance
  const filteredCrimes = useMemo(() => {
    if (!data.crimes) return [];
    
    return data.crimes.filter((crime) => 
      crime.id.toString().includes(search) ||
      crime.crime_type.toLowerCase().includes(search.toLowerCase()) || 
      crime.report_date_time.includes(search)
    );
  }, [data.crimes, search]);

  const markerRefs = useRef({}); // to store references to markers used in the map and handle them each

  // function to open a popup in the map, will be used later for when you click on a marker
  const openPopup = (crimeId) => {
    const marker = markerRefs.current[crimeId];
    if (marker) {
      marker.openPopup();
    }
  };

  const [showModal, setShowModal] = useState(false) // init for showing form modal

  if (loading) return <div className='font-silkscreen text-center justify-center items-center flex text-3xl text-city-white'><p>Loading Crimes...<br/><span className='text-city-bright-red'>Please Wait, City Defender.</span></p></div> // showing loading instead of an incomplete screen
  if (error){
    return <>Error: {error.message}</> // showing an error message instead of an incomplete screen
  }


  

  return ( 
    <div className='grid sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-1/2 sm:translate-x-1/2'>
      {/* the title */}
    <h1 className="font-silkscreen text-center font-bold text-city-white text-5xl sm:text-7xl w-[100vw]">City<span className="text-city-bright-red">X</span></h1>
    <h2 className="font-silkscreen text-city-white text-center text-3xl sm:text-5xl">SERVER1 | RIHAL</h2>
    <div className="bg-city-blue w-[95%] sm:w-[80%] block mapbr:flex flex-col mapbr:flex-row h-auto mapbr:h-[40rem] shadow-inner-xl place-self-center my-10">

      {/* search, crimes and report area */}
      <div className="px-2 mapbr:px-10 py-2 w-full mapbr:w-[50%]">
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search crimes" className="w-full rounded bg-city-white h-[2rem] p-1 font-silkscreen"></input>
        
        {/* a container to render all crimes as cards on the left and scroll through them */}
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
        {/* report crime button */}
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
    
    {/* form modal area */}
    {showModal && <FormModal setEnableSelect={setEnableSelect} formData={formData} setFormData={setFormData} onClose={()=> setShowModal(false)}/>}
  </div> 
  );
}

export default App;
