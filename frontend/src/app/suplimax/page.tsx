"use client";
import React, { useState } from "react";

const tones = ["Exciting", "Professional", "Friendly", "Bold"];
const audiences = ["Athletes", "Students", "Professionals", "General Public"];
const styles = ["Animated", "Live Action", "Minimalist", "Trendy"];

export default function SuplimaxGenerator() {
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [style, setStyle] = useState(styles[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [script, setScript] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScript(null);
    setVideoUrl(null);

    try {
      const response = await fetch("http://localhost:5000/api/suplimax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features, tone, audience, style }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const data = await response.json();
      setScript(data.script);
      setVideoUrl(
        data.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
      ); //Mock video URL for demo
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Suplimax AI Generator
          </h1>
          <p className="text-lg text-gray-600">
            Video, script, and ad image in seconds
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Product Features
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={4}
                required
                placeholder="e.g. Sugar-free, boosts energy, natural flavors"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {audiences.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
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
            <div className="mt-6 p-4 bg-red-50 rounded-md text-red-800">
              {error}
            </div>
          )}

          {videoUrl && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Video Preview
              </h3>
              <video
                src={videoUrl}
                controls
                className="w-full rounded-lg shadow-md mb-2"
              />
              <p className="text-sm text-gray-500 italic">
                This is a mock video simulating Gemini Veo3 output.
              </p>
            </div>
          )}

          {script && (
            <div className="mt-6 bg-gray-50 p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Generated Script</h4>
              <pre className="text-gray-800 whitespace-pre-wrap">{script}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
