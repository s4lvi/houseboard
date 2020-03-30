import React from 'react';

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

function MessageList() {
  return (
    <div style={componentStyle}>
      <h4 style={headerStyle}>MessageList</h4>
      <hr style={hrStyle} />
      <div style={listStyle}>

      </div>
    </div>
  );
}

export default MessageList;
