import os, shutil
from flask import Blueprint, request,jsonify
from flask_uploads import UploadSet, IMAGES,patch_request_class, AllExcept


upload = Blueprint('upload',__name__)
upFile = UploadSet('upFile',extensions=AllExcept(()))

@upload.route('', methods=['GET','POST'])
def uploadFile():
  emptyFolder()
  if request.method == 'POST' and 'videoFile'  in request.files:
    videoName=request.form['fileName']
    request.files['videoFile'].filename=videoName
    filename = upFile.save(request.files['videoFile'])
    # file_url = upFile.url(filename)
    return 'don'
  elif request.method == 'POST' and 'imageFile'  in request.files:
    imageName=request.form['fileName']
    request.files['imageFile'].filename=imageName
    filename = upFile.save(request.files['imageFile'])
    # file_url = upFile.url(filename)
    return 'don'
  else:
    return 'hi'

# clear all file in folder
def emptyFolder():
  folder = 'app/static'
  print(len(os.listdir(folder)))
  if len(os.listdir(folder))>=2:
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(e)
