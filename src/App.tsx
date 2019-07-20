import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import TodoList from "./components/TodoList";

class App extends Component {
  render() {
    return (
      <div
        style={{
          width: "40vw",
          margin: "10px auto",
          borderRadius: 20,
          // border: '#ededed solid 1px',
          padding: 30
          // boxShadow: '0px 1px 5px 0px #0000001c',
        }}
      >
        <TodoList />
      </div>
    );
  }
}

export default App;
