import openai
import json

with open("OpenAiAPIKey.json", "r") as config_file:
        config_data = json.load(config_file)
        openai.api_key = config_data.get("openai_api_key")

# Mock criteria for demonstration
SOIL_TYPE = "loamy"
CLIMATE = "temperate"


# Query the LLM via OpenAI API for detailed instructions
def get_growing_instructions(crop):
    prompt = f"How to grow {crop}? In no more than 2-3 lines."
    response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=150)
    instructions = response.choices[0].text.strip()
    return instructions

# Recommend crops based on criteria
def recommend_crops(soil_type, climate, crop_database):
    return crop_database.get(soil_type, {}).get(climate, [])

def main_howto(commodities):
    CROP_DATABASE = {
    "loamy": {
        "temperate": commodities
    }}
    recommended_crops = recommend_crops(SOIL_TYPE, CLIMATE, CROP_DATABASE)
    
    if not recommended_crops:
        print("No crops recommended for the given criteria.")
        return
    
    print(f"Recommended crops for {SOIL_TYPE} soil in {CLIMATE} climate are:")
    for crop in recommended_crops:
        print(f"- {crop}")
    
    returnInstructions = {}
    for crop in recommended_crops:
        instructions = get_growing_instructions(crop)
        returnInstructions[crop] = instructions
    return returnInstructions
if __name__ == "__main__":
   print( main_howto(["wheat", "barley", "potato"]))