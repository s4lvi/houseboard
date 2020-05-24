import React from 'react';

const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const componentStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  height: '800px',
  padding: '10px',
  border: '1px solid #999',
  borderRadius: '6px',
}

const headerStyle = {
  width: '200px',
  margin: '0'
}

const hrStyle = {
  width: '100%'
}

const listStyle = {

}

const messageStyle = {
  fontSize: '60%',
  textAlign: 'left'
}

const client = Stitch.initializeDefaultAppClient('houseboard-twrcx');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('houseboard');

class MessageList extends React.Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
      db.collection('messages').find().asArray()
    ).then(docs => {
        console.log("Found docs", docs)
        console.log("[MongoDB Stitch] Connected to Stitch")
        this.setState({
          messages: docs
        });
    }).catch(err => {
        console.error(err)
    });
  }

  render() {
    return (
    <div style={componentStyle}>
      <h4 style={headerStyle}>MessageList</h4>
      <hr style={hrStyle} />
      <div style={listStyle}>
        {this.state.messages.map(m => {
          console.log(m);
          return <div style={messageStyle}>"{m.message}" <br />- {m.author} on {m.timestamp.toString()}</div>
        })}
      </div>
    </div>
    );
  }
}

export default MessageList;
