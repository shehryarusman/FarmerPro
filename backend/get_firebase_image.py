import firebase_admin
from firebase_admin import credentials, storage


def download_first_image_in_folder(bucket_name, folder_path, destination_file_name):
    """Downloads the first image from the specified folder."""
    cred = credentials.Certificate('plant-disease-classifier-4f4c8-firebase-adminsdk-43gkg-441b401e1e.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': "plant-disease-classifier-4f4c8.appspot.com"
    })
    bucket = storage.bucket(bucket_name)
    
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
if __name__ == "__main__":
    download_first_image_in_folder('plant-disease-classifier-4f4c8.appspot.com', 
                'images/', 
                'image.png')