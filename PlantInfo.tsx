'use client';

export default function PlantInfo({ info }) {

    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-3xl font-semibold mb-4 text-green-700">{info.name}</h2>
        <p className="text-gray-600 italic mb-4">{info.scientificName}</p>
        <p className="text-gray-700 mb-6">{info.description}</p>
  
        <h3 className="text-xl font-semibold mb-2 text-green-600">Plant Details</h3>
        <table className="w-full mb-4">
          <tbody>
            <tr className="bg-green-100">
              <td className="font-semibold p-2">Family</td>
              <td className="p-2">{info.family}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Genus</td>
              <td className="p-2">{info.genus}</td>
            </tr>
            <tr className="bg-green-100">
              <td className="font-semibold p-2">Common Names</td>
              <td className="p-2">{info.commonNames}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }