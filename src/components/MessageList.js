import React from 'react';

const {
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
  textAlign: 'left',
  marginBottom: "1em"
}


class MessageList extends React.Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.client = props.client;
    this.db = props.db;
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
    this.refreshTimer = setInterval(this.refresh, 1000);
  }

  refresh() {
    this.client.auth.loginWithCredential(new AnonymousCredential()).then(() =>
      this.db.collection('messages').find().asArray()
    ).then(docs => {
        this.setState({
          messages: docs
        });
    }).catch(err => {
        console.error(err)
    });
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }


  render() {
    return (
    <div style={componentStyle}>
      <h4 style={headerStyle}>MessageList</h4>
      <hr style={hrStyle} />
      <div style={listStyle}>
        {this.state.messages.map(m => {
          return <div style={messageStyle}>"{m.message}" <br />- {m.author} on {m.timestamp ? m.timestamp.toString() : ""}</div>
        })}
      </div>
    </div>
    );
  }
}

export default MessageList;
