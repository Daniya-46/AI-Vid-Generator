"use client";
import React, { useState } from "react";
import LoadingButton from "../components/LoadingButton/page";
import ErrorBanner from "../components/ErrorBanner/page";
import VideoPreview from "../components/VideoPreview/page";
import ScriptOutput from "../components/ScriptOutput/page";

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
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
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

            <LoadingButton loading={loading} label="Generate" />
          </form>

          <ErrorBanner error={error} />

          <VideoPreview videoUrl={videoUrl} />

          <ScriptOutput script={script} />
        </div>
      </div>
    </div>
  );
}
