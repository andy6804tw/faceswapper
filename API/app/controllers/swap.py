#coding:utf-8
#swap
from flask import Blueprint, request,jsonify,redirect

import FaceSwap.imageSwap as imageSwap
import FaceSwap.videoSwap as videoSwap

swap = Blueprint('swap',__name__)
  

@swap.route('', methods=['GET','POST'])
def add():
  if request.method == 'GET':
    return jsonify({'result': str(imageSwap.i2iSwap(''))})
  else:
    insertValues = request.get_json()
    image1=insertValues['image1']
    image2=insertValues['image2']
    return jsonify({'result':str(imageSwap.i2iSwap(insertValues)),'image1':image1,'image2':image2})

@swap.route('/video', methods=['POST'])
def video():
  videoName=request.get_json()['videoName']
  imageName=request.get_json()['imageName']
  print(imageName)
  result=videoSwap.i2vSwap(imageName, videoName)
  return  result

@swap.route('/show')
def show():
  return redirect('API/FaceSwap/video/out.avi')
  
