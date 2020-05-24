import React from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const {
  Stitch,
  RemoteMongoClient,
} = require('mongodb-stitch-browser-sdk');


const client = Stitch.initializeDefaultAppClient('houseboard-twrcx');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('houseboard');


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MessageList client={client} db={db} />
      <MessageInput client={client} db={db} />
      </header>
    </div>
  );
}

export default App;
