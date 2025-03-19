import React from 'react';

const FormModal = ({ onClose, formData, setFormData, setEnableSelect }) => {
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectMarker = () => {
    setEnableSelect(true);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 font-silkscreen flex items-center justify-center">
      <div className="bg-city-blue p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-city-white">Report a Crime</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm text-city-white font-medium mb-1" htmlFor="crimeType">
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
            <label className="block text-sm text-city-white font-medium mb-1" htmlFor="description">
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
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-city-bright-red text-city-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSelectMarker}
              className="bg-city-ocean text-city-white px-4 py-2 rounded"
            >
              Select Crime Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;