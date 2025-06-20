"use client";
import React, { useState } from "react";

const styles = [
  "Luxury",
  "Family-Friendly",
  "Modern",
  "Romantic",
  "Minimalist",
];

export default function RealEstateVideoTour() {
  const [tourStyle, setTourStyle] = useState(styles[0]);
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const property = {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: 5,
    bathrooms: 6.5,
    squareFeet: "6,100",
    features: [
      "Luxury estate",
      "Three-car garage",
      "Landscaped grounds",
      "Elegant entrance with grand staircase",
      "Modern design",
      "Prime Beverly Hills location",
    ],
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScript(null);
    setVideoUrl(null);

    try {
      const response = await fetch("http://localhost:5000/api/real-estate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourStyle }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate video tour.");
      }

      const data = await response.json();
      setScript(data.script);
      setVideoUrl(
        data.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Real Estate Video Tour Generator
      </h1>

      <div className="bg-gray-50 p-6 rounded shadow border mb-8">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
        <p>
          <strong>Address:</strong> {property.address}
        </p>
        <p>
          <strong>Price:</strong> {property.price}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {property.bathrooms}
        </p>
        <p>
          <strong>Square Footage:</strong> {property.squareFeet}
        </p>
        <p>
          <strong>Features:</strong> {property.features.join(", ")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow border"
      >
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Tour Style
          </label>
          <select
            value={tourStyle}
            onChange={(e) => setTourStyle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5c6ac4] hover:bg-[#4a58b0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c6ac4] transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded">
          {error}
        </div>
      )}

      {videoUrl && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Virtual Tour</h3>
          <video src={videoUrl} controls className="w-full rounded-lg shadow" />
          <a
            href={videoUrl}
            download="real-estate-tour.mp4"
            className="inline-block mt-3 text-[#5c6ac4] hover:text-[#4a58b0] underline transition-colors"
          >
            Download Video
          </a>
        </div>
      )}

      {script && (
        <div className="mt-10 bg-gray-100 p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Generated Script</h4>
          <pre className="whitespace-pre-wrap text-gray-800">{script}</pre>
        </div>
      )}
    </div>
  );
}
