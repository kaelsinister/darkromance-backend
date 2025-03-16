from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

# Allow your frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request data structure
class StoryRequest(BaseModel):
    length: str
    spiceLevel: str
    trope: str
    characterTraits: str
    characterName: str
    characterAge: str
    characterBackstory: str
    ending: str

@app.get("/")
def read_root():
    return {"message": "Welcome to DarkRomance.ai API"}

@app.post("/generate-story/")
def generate_story(request: BaseModel):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    prompt = f"""
    Create a dark romance story with the following details:
    - Main Character Name: {request.characterName}
    - Main Character Age: {request.characterAge}
    - Main Character Traits: {request.characterTraits}
    - Main Character Backstory: {request.characterBackstory}
    - Preferred Trope: {request.trope}
    - Preferred Story Ending: {request.ending}
    Story Length: {request.length}
    Spice Level: {request.spiceLevel}

    Write the story in chapters, ending with the indicated preferred ending type.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1200
    )

    story = response.choices[0].message.content.strip()
    return {"story": story}
