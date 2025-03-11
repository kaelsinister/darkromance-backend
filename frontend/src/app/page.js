"use client";
import { useState } from "react";

export default function Home() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    length: "Short",
    spiceLevel: "Mild",
    characterTraits: "",
    trope: "Enemies to Lovers",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateStory = async () => {
    setLoading(true); // 🔥 Start loading animation
    setStory(""); // Clear previous story

    try {
      const response = await fetch("https://darkromance-backend.onrender.com/generate-story/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      setStory("Error generating story. Please try again.");
    }

    setLoading(false); // 🔥 Stop loading animation
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="story-container">
        <h1 className="text-red-400 text-2xl font-bold text-center mb-4">
          Dark Romance Story Generator
        </h1>

        {/* Form */}
        <label className="block mb-2 text-sm font-medium">Story Length</label>
        <select name="length" value={formData.length} onChange={handleChange} className="mb-4" disabled={loading}>
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>

        <label className="block mb-2 text-sm font-medium">Spice Level</label>
        <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className="mb-4" disabled={loading}>
          <option>Mild</option>
          <option>Medium</option>
          <option>Spicy</option>
        </select>

        <label className="block mb-2 text-sm font-medium">Main Character Traits</label>
        <input type="text" name="characterTraits" value={formData.characterTraits} onChange={handleChange} placeholder="e.g., brooding, protective, mysterious" className="mb-4" disabled={loading} />

        <label className="block mb-2 text-sm font-medium">Romance Trope</label>
        <select name="trope" value={formData.trope} onChange={handleChange} className="mb-4" disabled={loading}>
          <option>Enemies to Lovers</option>
          <option>Friends to Lovers</option>
          <option>Forbidden Love</option>
          <option>Arranged Marriage</option>
        </select>

        {/* Button & Loading Indicator */}
        <button onClick={generateStory} disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader mr-2"></div> Generating...
            </div>
          ) : (
            "Generate Story"
          )}
        </button>
      </div>

      {/* Story Display */}
      {story && (
        <div className="story-container mt-6">
          <h2 className="text-red-400 text-xl font-bold mb-4">Your Story</h2>
          <p className="whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  );
}
