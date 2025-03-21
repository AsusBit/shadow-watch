import {Search, Hourglass, Car, Users, CheckCircle, Skull, Lock, UserMinus, Banknote, Gavel} from 'lucide-react'

export default function CrimeCard({type, latitude, longitude, status, func}){
  // made to dynamically choose the colors and icons of the current status of displayed crimes --extra styling
    const statusIcons = {
        "Under Investigation": { icon: <Search color="white" />, label: "Under Investigation", color: "#eab308" },
        "Pending": { icon: <Hourglass color="white" />, label: "Pending", color: "gray" },
        "En Route": { icon: <Car color="white" />, label: "En Route", color: "blue" },
        "On Scene": { icon: <Users color="white" />, label: "On Scene", color: "red" },
        "Resolved": { icon: <CheckCircle color="white" />, label: "Resolved", color: "green" }
      };
    // made to dynamically choose the colors and icons of displayed crimes --extra styling
      const crimeTypeIcons = {
        "Robbery": { icon: <Banknote color="#D32F2F" />, label: "Robbery", color: "#D32F2F" },
        "Assault": { icon: <Gavel color="#E65100" />, label: "Assault", color: "#E65100" },
        "Homicide": { icon: <Skull color="#8B0000" />, label: "Homicide", color: "#8B0000" },
        "Kidnapping": { icon: <UserMinus color="#6A1B9A" />, label: "Kidnapping", color: "#6A1B9A" },
        "Theft": { icon: <Lock color="#1565C0" />, label: "Theft", color: "#1565C0" }
      };
    return (
        <button onClick={func} className="bg-city-white relative h-[6rem] ctbr:h-[5rem] rounded w-full block p-2" style={{borderLeft: `6px solid ${crimeTypeIcons[type]?.color}`}}>
          {/* display of crime icon and color */}
          <div className='flex items-center justify-center mapbr:justify-normal mb-1 mapbr:mb-0'>
          <span className="flex items-center">
            {crimeTypeIcons[type]?.icon}
          </span>
          <span className="font-medium" style={{ color: crimeTypeIcons[type]?.color }}>
            {type}
          </span>
          </div>
      {/* location, dynamically shown due to styling issues */}
        <div className='ctbr:absolute ctbr:top-1/2 ctbr:-translate-y-1/2 ctbr:right-1/2 ctbr:translate-x-1/2 max-h-0 mapbr:max-h-full opacity-0 mapbr:opacity-100 '>
        <p className=''>↓↑: {longitude.toFixed(4)}</p>
        <p className=''>←→:  {latitude.toFixed(4)}</p>
        </div>

          {/* status Badge */}
        <div 
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-white text-sm font-medium relative ctbr:absolute ctbr:right-2 ctbr:top-1/2 ctbr:-translate-y-1/2"
          style={{ backgroundColor: statusIcons[status]?.color }}
        >
          <span className="flex items-center">
            {statusIcons[status]?.icon}
          </span>
          <span className='max-w-[5.1rem]'>{statusIcons[status]?.label}</span>
        </div>
        

          </button>
    )
}