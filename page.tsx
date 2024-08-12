'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';

export default function Home() {
  const [plantInfo, setPlantInfo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <h1 className="text-5xl font-bold mb-4 text-green-800 text-center">PlantPal</h1>
          <p className="text-xl text-green-700 mb-8 text-center max-w-2xl mx-auto">
            Discover the wonders of nature! Upload an image of any plant, and let PlantPal identify and provide fascinating information about it.
          </p>
          <div className="flex flex-col items-center">
            <ImageUpload setPlantInfo={setPlantInfo} setUploadedImage={setUploadedImage} />
            {uploadedImage && (
              <div className="mt-8 mb-8">
                <img src={uploadedImage} alt="Uploaded plant" className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg" />
              </div>
            )}
            {plantInfo && <PlantInfo info={plantInfo} />}
          </div>
        </div>
      </main>
    </div>
  );
}