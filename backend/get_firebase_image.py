import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate('plant-disease-classifier-4f4c8-firebase-adminsdk-43gkg-d4e7a65974.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': "plant-disease-classifier-4f4c8.appspot.com"
})
bucket = storage.bucket('plant-disease-classifier-4f4c8.appspot.com')

def download_first_image_in_folder(folder_path, destination_file_name):
    """Downloads the first image from the specified folder."""
   
    # List all blobs that start with the folder path
    blobs = bucket.list_blobs(prefix=folder_path)

    # Get the first blob
    blob = None
    for b in blobs:
        if b.name != folder_path:  # This check ensures you don't get a folder's "virtual blob"
            blob = b
            break
    if blob:
        blob.download_to_filename(destination_file_name)
        print(f"Blob {blob.name} downloaded to {destination_file_name}.")
    else:
        print("No images found in the specified folder.")

def delete_folder_contents(folder_path):
    blobs = bucket.list_blobs(prefix=folder_path)  # Gets all files under the folder path
    for blob in blobs:
        blob.delete()

if __name__ == "__main__":
    download_first_image_in_folder(
                'images/', 
                'image.png')