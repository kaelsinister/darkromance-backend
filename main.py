from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from typing import Union
import os

app = FastAPI()

# Allow frontend communication
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
    customTrope: str = ""
    characterTraits: str
    characterName: str
    characterAge: Union[str, int]
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

    # Improved prompt for structured and continuation-ready story
    prompt = f"""
    You are an expert dark romance novelist. Write a captivating, dark romance story clearly structured into chapters. Follow these details exactly:

    Main Character: {request.characterName} ({request.characterAge} years old)
    - Traits: {request.characterTraits}
    - Backstory: {request.characterBackstory}

    Preferred Romance Trope: {trope_value}
    Desired Story Ending: {request.ending}
    Story Length: {request.length}
    Spice Level: {request.spiceLevel}

    Instructions:
    - Begin with an engaging hook and introduce clear conflict.
    - Structure the narrative into distinct chapters (e.g., "Chapter 1:", "Chapter 2:").
    - Each chapter should clearly progress the story.
    - Include immersive descriptions, emotional depth, and character development.
    - If the spice level is high, include tasteful yet steamy scenes relevant to the narrative.
    - Ensure the story ends in a way that is satisfying yet open enough for potential continuation.

    Format clearly, with line breaks between paragraphs for readability.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000
    )

    # Proper paragraph formatting
    story = response.choices[0].message.content.strip().replace("\n", "\n\n")

    return {"story": story}
