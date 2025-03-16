from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from typing import Union

app = FastAPI()

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Updated StoryRequest Model
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
async def generate_story(request: Request):
    """Handles incoming requests, logs data, and generates a story."""

    # ✅ Log raw request body
    body = await request.body()
    print("📢 Received Request Data:", body.decode())

    try:
        # ✅ Parse JSON and validate
        request_data = await request.json()
        story_request = StoryRequest(**request_data)
    except Exception as e:
        print("❌ Invalid request format:", str(e))
        return {"error": "Invalid request format", "details": str(e)}

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # ✅ Handle custom trope selection
    trope_value = story_request.trope if story_request.trope != "Other" else story_request.customTrope

    # ✅ Properly formatted prompt
    prompt = f"""
    Create a dark romance novel with the following details:

    📌 **Main Character Information**
    - **Name:** {story_request.characterName}
    - **Age:** {story_request.characterAge}
    - **Traits:** {story_request.characterTraits}
    - **Backstory:** {story_request.characterBackstory}

    📖 **Story Preferences**
    - **Preferred Trope:** {trope_value}
    - **Preferred Ending:** {story_request.ending}
    - **Story Length:** {story_request.length}
    - **Spice Level:** {story_request.spiceLevel}

    ### **Story Format**
    - Write this story in detailed **chapter format**.
    - Each chapter should be **at least 400-600 words long**.
    - Provide **scene transitions** and detailed **character interactions**.
    - Ensure proper **spacing** between paragraphs.
    - Spice level determines **romantic/steamy content intensity**.

    ✍️ **Now, generate the story with this formatting.**
    """

    # ✅ Log the generated prompt (NO INDENTATION ERRORS NOW)
    print("📝 Generated Prompt:\n", prompt)

    try:
        # ✅ Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2500  # ✅ Increased token limit
        )

        story = response.choices[0].message.content.strip()
        print("✅ Story Generated Successfully")
        return {"story": story}

    except Exception as e:
        print("❌ OpenAI API Error:", str(e))
        return {"error": "Failed to generate story", "details": str(e)}
