"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar"; // ✅ Navbar imported

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      customTrope: name === "trope" && value !== "Other" ? "" : prev.customTrope,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStory(""); // Clear previous story

    const requestData = { ...formData };
    if (formData.trope === "Other") {
      requestData.trope = formData.customTrope;
    }

    try {
      const response = await fetch("https://darkromance-backend.onrender.com/generate-story/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.story) {
        setStory(data.story);
      } else {
        setStory("An error occurred. Please try again.");
      }
    } catch (error) {
      setStory("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-center p-4">
      {/* ✅ Navbar added with bottom margin */}
      <Navbar />
      
      {/* Add spacing between navbar and the rest of the page */}
      <div className="w-full max-w-3xl text-center mt-8"> 
        <h1 className="text-4xl text-red-400 font-bold">DarkRomance.ai</h1>
        <p className="italic">Indulge in a romance tailored to your desires.</p>
      </div>

      <form onSubmit={handleSubmitForm} className="story-container mt-8">
        <h2 className="text-2xl font-semibold text-red-400 mb-4">Create Your Story</h2>

        <label className="block text-gray-400">Main Character Name:</label>
        <input type="text" name="characterName" placeholder="Enter character name" className="mb-4" value={formData.characterName} onChange={handleChange} required />

        <label className="block text-gray-400">Main Character Age:</label>
        <input type="number" name="characterAge" placeholder="e.g. 27" className="mb-4" value={formData.characterAge} onChange={handleChange} required />

        <label className="block text-gray-400">Story Length:</label>
        <select name="length" value={formData.length} onChange={handleChange} className="mb-4" required>
          <option value="">Select Length</option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>

        <label className="block text-gray-400">Spice Level:</label>
        <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className="mb-4" required>
          <option value="">Select Spice Level</option>
          <option value="Mild">Mild</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block text-gray-400">Preferred Trope:</label>
        <select name="trope" value={formData.trope} onChange={handleChange} className="mb-4" required>
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
          <>
            <label className="block text-gray-400">Custom Trope:</label>
            <input type="text" name="customTrope" placeholder="Enter custom trope" className="mb-4" value={formData.customTrope} onChange={handleChange} required />
          </>
        )}

        <label className="block text-gray-400">Main Character Traits:</label>
        <input type="text" name="characterTraits" placeholder="e.g. brooding, mysterious" className="mb-4" value={formData.characterTraits} onChange={handleChange} required />

        <label className="block text-gray-400">Main Character Backstory:</label>
        <textarea name="characterBackstory" placeholder="Brief backstory..." className="mb-4" value={formData.characterBackstory} onChange={handleChange} required />

        <label className="block text-gray-400">Preferred Ending:</label>
        <input type="text" name="ending" placeholder="e.g. happy, tragic" className="mb-6" value={formData.ending} onChange={handleChange} required />

        <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-200 ease-in-out">
          Generate Story
        </button>
      </form>

      {loading && <div className="loader mt-6"></div>}

      {story && (
        <div className="story-container mt-8 whitespace-pre-wrap">
          <h2 className="text-2xl text-red-400 font-semibold mb-4">Your Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}
