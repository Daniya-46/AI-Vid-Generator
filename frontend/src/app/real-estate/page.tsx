"use client";
import React, { useState } from "react";
import VideoPreview from "../components/VideoPreview/page";
import ScriptOutput from "../components/ScriptOutput/page";
import ErrorBanner from "../components/ErrorBanner/page";
import LoadingButton from "../components/LoadingButton/page";

const styles = [
  "Luxury",
  "Family-Friendly",
  "Modern",
  "Romantic",
  "Minimalist",
];

export default function RealEstateVideoTour() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [features, setFeatures] = useState("");
  const [tourStyle, setTourStyle] = useState(styles[0]);
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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
        body: JSON.stringify({
          tourStyle,
          address,
          price,
          bedrooms,
          bathrooms,
          squareFeet,
          features,
        }),
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
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Real Estate Video Tour Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow border"
      >
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Square Feet
              </label>
              <input
                type="text"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Key Features (comma-separated)
            </label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              placeholder="e.g. Pool, Fireplace, Ocean View"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Select Tour Style
            </label>
            <select
              value={tourStyle}
              onChange={(e) => setTourStyle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {styles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

        <LoadingButton loading={loading} label="Generate" />
      </form>

      <ErrorBanner error={error} />

      <VideoPreview videoUrl={videoUrl} />

      <ScriptOutput script={script} />
    </div>
  );
}
