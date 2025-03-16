import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-red-400">DarkRomance.ai</h1>
      <p className="mt-4 text-lg text-gray-400">Indulge in personalized dark romance stories, crafted to your desires.</p>
      <a href="/generator" className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-lg">
        Create Your Story
      </a>
    </div>
  );
}
