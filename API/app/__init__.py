# coding:utf-8
import config
from flask import Flask,request,render_template
from flask_cors import CORS
from app.controllers.swap import swap 
from app.controllers.upload import upload, upFile
from flask_uploads import configure_uploads



app=Flask(__name__)
CORS(app)
# app.config['UPLOADED_PHOTOS_DEST'] = os.getcwd()  # 文件储存地址
app.config.from_object(config)
configure_uploads(app, upFile)

app.register_blueprint(swap, url_prefix='/swap')
app.register_blueprint(upload, url_prefix='/upload')

@app.route('/test', methods=['GET'])
def home():
    return "<h1>Hello Flask!</h1>"

