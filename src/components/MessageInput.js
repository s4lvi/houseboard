import React from 'react';
const {
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');


class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.client = props.client;
        console.log(this.client);
        this.db = props.db;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
            let timestamp = new Date(Date.now());
            let insert = {
                message: document.getElementById("messageInput").value,
                author: "anonymous",
                timestamp: timestamp,
                board: "testboard"
            }
            console.log("inserting...", insert)
            document.getElementById("messageInput").value = "";
            this.db.collection('messages').insertOne(insert);
            }).catch(err => {
              console.error(err)
          });
    }

    render() {
        return (<div>
            <input type="text" id="messageInput" placeholder="Enter a message"></input>
            <button onClick={this.handleSubmit} >Submit</button>
        </div>);
    }
}

export default MessageInput;