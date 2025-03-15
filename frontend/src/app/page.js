import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    length: "Medium",
    spiceLevel: "Steamy",
    trope: "Enemies to Lovers",
    characterTraits: "Brooding, mysterious, protective",
    characterAge: "27",
    characterBackstory: "",
    ending: "Happy",
  });

  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");

  const generateStory = async () => {
    setLoading(true);
    setStory("");

    const response = await fetch("https://darkromance-backend.onrender.com/generate-story/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setStory(data.story);
    setLoading(false);
  };

  return (
    <div className="story-container">
      <h1>Generate Your Dark Romance Story</h1>

      <label>Story Length:</label>
      <select value={formData.length} onChange={(e) => setFormData({ ...formData, length: e.target.value })}>
        <option value="Short">Short</option>
        <option value="Medium">Medium</option>
        <option value="Long">Long</option>
      </select>

      <label>Spice Level:</label>
      <select value={formData.spiceLevel} onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value })}>
        <option value="Mild">Mild</option>
        <option value="Steamy">Steamy</option>
        <option value="Explicit">Explicit</option>
      </select>

      <label>Romance Trope:</label>
      <select value={formData.trope} onChange={(e) => setFormData({ ...formData, trope: e.target.value })}>
        <option value="Enemies to Lovers">Enemies to Lovers</option>
        <option value="Forbidden Love">Forbidden Love</option>
        <option value="Billionaire & Bodyguard">Billionaire & Bodyguard</option>
        <option value="Vampire Romance">Vampire Romance</option>
        <option value="Arranged Marriage">Arranged Marriage</option>
      </select>

      <label>Main Character Traits:</label>
      <input
        value={formData.characterTraits}
        onChange={(e) => setFormData({ ...formData, characterTraits: e.target.value })}
        placeholder="Brooding, mysterious, protective"
      />

      <label>Main Character Age:</label>
      <input
        type="number"
        value={formData.characterAge}
        onChange={(e) => setFormData({ ...formData, characterAge: e.target.value })}
        placeholder="e.g. 27"
      />

      <label>Main Character Backstory (optional):</label>
      <textarea
        value={formData.characterBackstory}
        onChange={(e) => setFormData({ ...formData, characterBackstory: e.target.value })}
        placeholder="A mysterious past..."
      />

      <label>Preferred Ending:</label>
      <select value={formData.ending} onChange={(e) => setFormData({ ...formData, ending: e.target.value })}>
        <option value="Happy">Happy</option>
        <option value="Bittersweet">Bittersweet</option>
        <option value="Tragic">Tragic</option>
      </select>

      <button onClick={generateStory} disabled={loading}>
        {loading ? <div className="loader"></div> : "Generate Story"}
      </button>

      {story && (
        <div className="mt-4">
          {story.split("\n").map((p, i) => (
            <p key={i} className="mb-4">{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}