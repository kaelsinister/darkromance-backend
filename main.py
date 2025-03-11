from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Define request model
class StoryRequest(BaseModel):
    length: str
    spiceLevel: str
    characterTraits: str
    trope: str

# Define story generation function
@app.post("/generate-story/")
def generate_story(request: StoryRequest):
    try:
        # Generate a prompt based on user input
        prompt = (
            f"Write a {request.length.lower()} dark romance story with a {request.spiceLevel.lower()} spice level. "
            f"The main character is {request.characterTraits}. The story follows the {request.trope.lower()} trope."
        )

        # Send the prompt to OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )

        # Extract and return the generated story
        story_text = response.choices[0].message.content
        return {"story": story_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating story: {str(e)}")

# Root Route (Prevents 404 errors on base URL)
@app.get("/")
def read_root():
    return {"message": "Dark Romance AI Backend is Running"}
