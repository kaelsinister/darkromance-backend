"use client";
import { useState } from "react";

export default function Home() {
  const [length, setLength] = useState("short");
  const [spiceLevel, setSpiceLevel] = useState("mild");
  const [characterTraits, setCharacterTraits] = useState("");
  const [trope, setTrope] = useState("enemies to lovers");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory(""); // Clear previous story

    const response = await fetch("http://localhost:8000/generate-story/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        length,
        spice_level: spiceLevel,
        character_traits: characterTraits,
        trope,
      }),
    });

    const data = await response.json();
    setStory(data.story);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Generate Your Dark Romance Story</h1>

        {/* Length Selection */}
        <label className="block mb-2 font-medium">Story Length</label>
        <select 
          className="w-full p-2 border rounded mb-4"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        {/* Spice Level Selection */}
        <label className="block mb-2 font-medium">Spice Level</label>
        <select 
          className="w-full p-2 border rounded mb-4"
          value={spiceLevel}
          onChange={(e) => setSpiceLevel(e.target.value)}
        >
          <option value="mild">Mild</option>
          <option value="steamy">Steamy</option>
          <option value="explicit">Explicit</option>
        </select>

        {/* Character Traits */}
        <label className="block mb-2 font-medium">Main Character Traits</label>
        <input 
          type="text"
          placeholder="e.g., brooding, protective, mysterious"
          className="w-full p-2 border rounded mb-4"
          value={characterTraits}
          onChange={(e) => setCharacterTraits(e.target.value)}
        />

        {/* Trope Selection */}
        <label className="block mb-2 font-medium">Romance Trope</label>
        <select 
          className="w-full p-2 border rounded mb-4"
          value={trope}
          onChange={(e) => setTrope(e.target.value)}
        >
          <option value="enemies to lovers">Enemies to Lovers</option>
          <option value="forbidden love">Forbidden Love</option>
          <option value="second chance romance">Second Chance Romance</option>
          <option value="grumpy meets sunshine">Grumpy Meets Sunshine</option>
          <option value="dark obsession">Dark Obsession</option>
        </select>

        {/* Generate Button */}
        <button 
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          onClick={generateStory}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>

      {/* Display Generated Story */}
      {story && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-lg w-full">
          <h2 className="text-xl font-bold mb-2">Your Story:</h2>
          <p className="text-gray-700 whitespace-pre-line">{story}</p>
        </div>
      )}
    </div>
  );
}
