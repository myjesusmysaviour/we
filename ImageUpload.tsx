'use client';

import { useState } from 'react';
import axios from 'axios';

const PLANT_ID_API_KEY = process.env.NEXT_PUBLIC_PLANT_ID_API_KEY;

export default function ImageUpload({ setPlantInfo, setUploadedImage }) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      const base64Image = await fileToBase64(file);
      setUploadedImage(URL.createObjectURL(file));

      const data = {
        api_key: PLANT_ID_API_KEY,
        images: [base64Image],
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy", "synonyms"]
      };

      const response = await axios.post('https://api.plant.id/v2/identify', data);

      if (response.data.suggestions && response.data.suggestions.length > 0) {
        const plant = response.data.suggestions[0];
        const plantInfo = {
          name: plant.plant_name,
          scientificName: plant.plant_details.scientific_name,
          description: plant.plant_details.wiki_description.value,
          family: plant.plant_details.taxonomy.family,
          genus: plant.plant_details.taxonomy.genus,
          commonNames: plant.plant_details.common_names.join(', '),
        };
        setPlantInfo(plantInfo);
      } else {
        setError('Unable to identify the plant. Please try a different image.');
      }
    } catch (error) {
      console.error('Error identifying plant:', error);
      setError(`Error identifying plant: ${error.message}`);
      setPlantInfo(null);
    }

    setIsLoading(false);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="mb-8">
      <label htmlFor="file-upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full cursor-pointer transition-colors shadow-md">
        Upload Plant Image
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleImageUpload}
        accept="image/*"
      />
      {isLoading && <p className="mt-4 text-gray-600">Identifying plant...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}