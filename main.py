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
                f"You are writing an engaging, novel-like dark romance story chapter. "
                f"Here's what you previously wrote:\n\n"
                f"{request.continueFrom}\n\n"
                "Write the next chapter, seamlessly picking up where the last chapter left off. "
                "Maintain consistent character names, traits, narrative tone, plot threads, and story progression. "
                "End the chapter on an intriguing note or cliffhanger to encourage further reading."
            )
        else:
            prompt_intro = (
                f"Begin a {request.length.lower()} dark romance novel with {request.spiceLevel.lower()} spice. "
                f"Central romance trope: '{request.trope}'. Main character is {request.characterAge} years old "
                f"with traits: {request.characterTraits}. The story should end in a {request.ending.lower()} manner."
            )

            if request.characterBackstory:
                prompt_intro += f" The character's backstory is: {request.characterBackstory}."

            prompt_intro += (
                " Structure the output as Chapter 1 of a novel, introducing the main characters, setting, "
                "and central conflict. The chapter should conclude with an engaging cliffhanger or narrative hook."
            )
            prompt = prompt_intro

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1200,
            temperature=0.9  # Increased creativity for novel-like structure
        )

        story_text = response.choices[0].message.content.strip()
        return {"story": story_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")
