import openai
import json
import os

file = "OpenAiAPIKey.json"
with open(file, "r") as config_file:
        config_data = json.load(config_file)
        openai.api_key = config_data.get("openai_api_key")


# Query the LLM via OpenAI API for crop rotation table
def get_crop_rotation(crops):
    print(crops)
    prompt = "what is the best crop rotation method that should be used with {}, {}, {}, and {} in each year? " \
             "give me the response in a simple csv format. For eg, Year1,Spring,crop for Spring,Summer,crop for Summer,fall, crop for Fall,Winter, crop for Winter, all the way until Year4. The seasons should start from Spring and end at Winter, in order."\
             "There should also be a final paragraph at the end explaining why each crop works for each season".format(crops[3], crops[2], crops[1], crops[0])
    response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=300)
    return response.choices[0].text.strip()

def main_rotation(CROP_ROTATION_LIST):
    print("Crops for rotation are:")
    for crop in CROP_ROTATION_LIST:
        print("- {}".format(crop))

    rotation_table = get_crop_rotation(CROP_ROTATION_LIST)
    print("\nCrop Rotation Table:")
    return rotation_table

if __name__ == "__main__":
    main_rotation()