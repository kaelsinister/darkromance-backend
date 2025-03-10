import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware  # ✅ Add this line

# Get OpenAI API key from environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("Missing OpenAI API key. Make sure it's set in the environment variables.")

# Initialize FastAPI app
app = FastAPI()

# ✅ Add CORS Middleware (Fixes "OPTIONS /generate-story/ 405 Method Not Allowed" error)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

# Request model for API input
class StoryRequest(BaseModel):
    length: str
    spice_level: str
    character_traits: str
    trope: str

# Story generation function
def generate_story(length, spice_level, character_traits, trope):
    prompt = f"""
    Write a {length} dark romance story with a {spice_level} level of intimacy. 
    The main character has the following traits: {character_traits}. 
    The story follows the trope: {trope}.
    """

    client = OpenAI(api_key=openai_api_key)

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    
    return response.choices[0].message.content

# API endpoint to generate a story
@app.post("/generate-story/")
def generate(request: StoryRequest):
    story = generate_story(request.length, request.spice_level, request.character_traits, request.trope)
    return {"story": story}

# Run the server (only for local testing)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
