"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* Page Title */}
        <h1 className="text-4xl text-red-400 font-bold mb-6 tracking-wide">
          How It Works
        </h1>

        {/* Content Container */}
        <div className="bg-gray-900 p-8 max-w-3xl w-full rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4 text-center">
            Create, Customize, and Experience Dark Romance Like Never Before
          </h2>

          <div className="space-y-6">
            {/* Step 1 - Customization */}
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                1. Personalize Your Story
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Choose your **character names, personality traits, backstory, and age** to
                shape a story that feels uniquely yours.  
                Select your preferred **romance trope** from classics like *Enemies to Lovers* or *Fake Relationship*—or type in your own!  
                Adjust the **spice level** to set the intensity of romance, from **sweet** to **steamy**.
              </p>
            </div>

            {/* Step 2 - AI Generation */}
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                2. AI-Generated Dark Romance
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our cutting-edge AI weaves **a fully immersive** dark romance based on your selections.  
                The story is crafted **in chapters**, ensuring depth and flow.   
                With **dramatic tension, emotional connections, and passionate moments**, your romance unfolds in a **novel-like experience**.
              </p>
            </div>

            {/* Step 3 - Interactive Reading */}
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                3. Read, Save & Continue
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Want more? **Continue your story seamlessly**—picking up exactly where you left off.  
                Enjoy a truly **interactive reading experience** where you shape the journey.  
                Subscribers can **save their favorite stories**, re-read them anytime, or even tweak details for alternate versions!
              </p>
            </div>

            {/* Step 4 - Subscription & Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                4. Unlock Unlimited Stories
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Start with **3 free stories per month**. Want unlimited access?  
                Upgrade to **Premium** or **Unlimited** plans to unlock exclusive features:  
                🔥 **More stories per month**  
                ✍ **AI-assisted editing & rewriting**  
                💾 **Save & revisit your favorite stories**  
                ❤️ **Higher spice levels & deeper customization**  
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
