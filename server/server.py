from flask import Flask, request
from pymongo import MongoClient
from bson.json_util import dumps

client = MongoClient('localhost', 27017)
db = client['houseboard']
posts = db['posts']
app = Flask(__name__)

@app.route('/')
def health():
    return 'houseboard - server'

@app.route('/<boardId>/', methods=['GET'])
def getBoard(boardId):
    #build board view and return
    return dumps(posts.find())

@app.route('/<boardId>/postMessage', methods=['POST'])
def postMessage(boardId):
    posts.insert_one({
        "message": request.json['message'],
        "board": boardId
        })
    return "OK", 200

if __name__ == "__main__":
    app.run()