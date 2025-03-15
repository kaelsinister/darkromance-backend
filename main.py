from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StoryRequest(BaseModel):
    length: str
    spiceLevel: str
    trope: str
    characterTraits: str
    characterAge: int
    characterBackstory: str | None = None
    ending: str
    continueFrom: str | None = None

@app.post("/generate-story/")
def generate_story(request: StoryRequest):
    try:
        if request.continueFrom:
            prompt = (
                f"Continue the following dark romance story maintaining the same characters, plot details, names, and style:\n\n"
                f"{request.continueFrom}\n\n"
                "Continue seamlessly from here, maintaining consistent character names, events, and overall continuity."
            )
        else:
            prompt = (
                f"Write a {request.length.lower()} dark romance story "
                f"with {request.spiceLevel.lower()} spice. "
                f"The main character is {request.characterAge} years old, traits: {request.characterTraits}. "
                f"Trope used: {request.trope}. Ending style: {request.ending.lower()}."
            )
            if request.characterBackstory:
                prompt += f" Character's backstory: {request.characterBackstory}."

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.8  # Optional, helps creative continuity
        )

        story_text = response.choices[0].message.content.strip()
        return {"story": story_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")
