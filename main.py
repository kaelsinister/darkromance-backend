from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change if needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request data structure
class StoryRequest(BaseModel):
    length: str
    spiceLevel: str
    trope: str
    customTrope: str = ""  # ✅ Added to handle "Other" trope selection
    characterTraits: str
    characterName: str
    characterAge: Union[str, int]
    characterBackstory: str
    ending: str

@app.get("/")
def read_root():
    return {"message": "Welcome to DarkRomance.ai API"}

@app.post("/generate-story/")
async def generate_story(request: Request):
    """Handles incoming requests, logs data, and generates a story."""

    # ✅ Log raw request body
    body = await request.body()
    print("📢 Received Request Data:", body.decode())  # ✅ Logs the JSON input

    try:
        # ✅ Parse JSON from request and validate
        request_data = await request.json()
        story_request = StoryRequest(**request_data)  # ✅ Validate input against StoryRequest model
    except Exception as e:
        print("❌ Invalid request format:", str(e))
        return {"error": "Invalid request format", "details": str(e)}  # ✅ Return error for bad requests

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # ✅ Handle custom trope selection
    trope_value = story_request.trope if story_request.trope != "Other" else story_request.customTrope

    prompt = f"""
    Create a dark romance story with the following details:
    - Main Character Name: {story_request.characterName}
    - Main Character Age: {story_request.characterAge}
    - Main Character Traits: {story_request.characterTraits}
    - Main Character Backstory: {story_request.characterBackstory}
    - Preferred Trope: {trope_value}
    - Preferred Story Ending: {story_request.ending}
    Story Length: {story_request.length}
    Spice Level: {story_request.spiceLevel}

    Write the story in chapters, with a compelling, immersive narrative. Spice level is the level of steamy scenes.
    """

    # ✅ Log the generated prompt for debugging
    print("📝 Generated Prompt:\n", prompt)

    try:
        # ✅ Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1200
        )

        story = response.choices[0].message.content.strip()
        print("✅ Story Generated Successfully")
        return {"story": story}

    except Exception as e:
        print("❌ OpenAI API Error:", str(e))
        return {"error": "Failed to generate story", "details": str(e)}  # ✅ Return error if OpenAI API fails
