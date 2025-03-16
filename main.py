from fastapi import FastAPI
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
    characterAge: str
    characterBackstory: str
    ending: str

@app.get("/")
def read_root():
    return {"message": "Welcome to DarkRomance.ai API"}

@app.post("/generate-story/")
def generate_story(request: StoryRequest):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Handle custom trope selection
    trope_value = request.trope if request.trope != "Other" else request.customTrope

    prompt = f"""
    Create a dark romance story with the following details:
    - Main Character Name: {request.characterName}
    - Main Character Age: {request.characterAge}
    - Main Character Traits: {request.characterTraits}
    - Main Character Backstory: {request.characterBackstory}
    - Preferred Trope: {trope_value}
    - Preferred Story Ending: {request.ending}
    Story Length: {request.length}
    Spice Level: {request.spiceLevel}

    Write the story in chapters, with a compelling, immersive narrative. Spice level is the level of steamy scenes.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1200
    )

    story = response.choices[0].message.content.strip()
    return {"story": story}
