"use client";
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    length: "",
    spiceLevel: "",
    trope: "",
    customTrope: "",
    characterName: "",
    characterAge: "",
    characterTraits: "",
    characterBackstory: "",
    ending: "",
  });

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) || "" : value,
      customTrope: name === "trope" && value !== "Other" ? "" : formData.customTrope,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = { ...formData };
    if (formData.trope === "Other") {
      requestData.trope = formData.customTrope;
    }

    const response = await fetch("https://darkromance-backend.onrender.com/generate-story/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    setLoading(false);

    if (data.story) {
      setStory(data.story);
    } else {
      setStory("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-center p-4">
      <div className="header mb-8">
        <h1 className="text-4xl text-red-400 font-bold">DarkRomance.ai</h1>
        <p className="italic">Indulge in a romance tailored to your desires.</p>
      </div>

      <form onSubmit={handleSubmitForm} className="story-container">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">Create Your Story</h2>

        <label className="block text-gray-400">Main Character Name:</label>
        <input type="text" name="characterName" placeholder="Enter character name" className="mb-4" onChange={handleChange} />

        <label className="block text-gray-400">Main Character Age:</label>
        <input type="number" name="characterAge" value={formData.characterAge} placeholder="e.g. 27" className="mb-4" onChange={handleChange} />

        <label className="block text-gray-400">Story Length:</label>
        <select name="length" value={formData.length} onChange={handleChange} className="mb-4">
          <option value="">Select Length</option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>

        <label className="block text-gray-400">Spice Level:</label>
        <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className="mb-4">
          <option value="">Select Spice Level</option>
          <option value="Mild">Mild</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block text-gray-400">Preferred Trope:</label>
        <select name="trope" value={formData.trope} onChange={handleChange} className="mb-4">
          <option value="">Select Trope</option>
          <option value="Enemies to Lovers">Enemies to Lovers</option>
          <option value="Fake Relationship">Fake Relationship</option>
          <option value="Forbidden Love">Forbidden Love</option>
          <option value="Friends to Lovers">Friends to Lovers</option>
          <option value="Royal Romance">Royal Romance</option>
          <option value="Secret Identity">Secret Identity</option>
          <option value="Second Chance">Second Chance Romance</option>
          <option value="Other">Other (Specify Below)</option>
        </select>

        {formData.trope === "Other" && (
          <input type="text" name="customTrope" value={formData.customTrope} placeholder="Enter custom trope" className="mb-4" onChange={handleChange} />
        )}

        <label className="block text-gray-400">Main Character Traits:</label>
        <input type="text" name="characterTraits" value={formData.characterTraits} placeholder="e.g. brooding, mysterious" className="mb-4" onChange={handleChange} />

        <label className="block text-gray-400">Main Character Backstory:</label>
        <textarea name="characterBackstory" value={formData.characterBackstory} placeholder="Brief backstory..." className="mb-4" onChange={handleChange}></textarea>

        <label className="block text-gray-400">Preferred Ending:</label>
        <input type="text" name="ending" value={formData.ending} placeholder="e.g. happy, tragic" className="mb-6" onChange={handleChange} />

        <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-200 ease-in-out">
          Generate Story
        </button>
      </form>

      {loading && <div className="loader mt-6"></div>}

      {story && (
        <div className="story-container mt-8">
          <h2 className="text-2xl text-red-400 font-semibold mb-4">Your Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}
