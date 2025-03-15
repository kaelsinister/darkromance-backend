from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# FastAPI app initialization
app = FastAPI()

# CORS configuration (allows your frontend to talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You may restrict this later to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for incoming requests
class StoryRequest(BaseModel):
    length: str
    spiceLevel: str
    trope: str
    characterTraits: str
    characterAge: int
    characterBackstory: str | None = None  # Optional
    ending: str

# API endpoint to generate stories
@app.post("/generate-story/")
def generate_story(request: StoryRequest):
    try:
        prompt = (
            f"Write a {request.length.lower()} dark romance story "
            f"with a {request.spiceLevel.lower()} spice level. "
            f"The main character is {request.characterAge} years old, and has these traits: {request.characterTraits}. "
            f"The story uses the '{request.trope}' trope and has a {request.ending.lower()} ending."
        )

        if request.characterBackstory:
            prompt += f" The character's backstory is: {request.characterBackstory}"

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )

        story_text = response.choices[0].message.content.strip()
        return {"story": story_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")
