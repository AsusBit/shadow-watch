import React, { useState } from 'react';

const FormModal = ({ onClose, setData, data }) => {
  const [formData, setFormData] = useState({
    crimeType: '',
    description: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;  
    setData({"crimes": [
        ...data['crimes'], 
        {
        "id": data["crimes"].length+1,
        "report_details": formData.description,
        "crime_type": formData.crimeType,
        "latitude": parseFloat(formData.latitude),
        "longitude": parseFloat(formData.longitude),
        "report_date_time": formattedDate,
        "report_status": "Pending" }
    ]
}
)
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 font-silkscreen flex items-center justify-center">
      <div className="bg-city-bright-blue p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Report a Crime</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="crimeType">
              Crime Type
            </label>
            <select
              id="crimeType"
              name="crimeType"
              value={formData.crimeType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select a crime type</option>
              <option value="Robbery">Robbery</option>
              <option value="Assault">Assault</option>
              <option value="Homicide">Homicide</option>
              <option value="Kidnapping">Kidnapping</option>
              <option value="Theft">Theft</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="latitude">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="longitude">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-city-bright-red text-city-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-city-ocean text-city-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;