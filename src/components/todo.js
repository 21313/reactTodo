import React, { Component } from 'react';
import firebase from 'firebase';



var headingStyle = {
  color: 'red',
};

class Todo extends Component {
    constructor() {
    super()
    this.addTodo = this.addTodo.bind(this)
    this.state = {
      todos: []
    }
  }

  componentWillMount() {
    let refRoot = firebase.database().ref('/todo/')
    refRoot.on("child_added", (snap) => {
      var obj = snap.val();
      obj.id = snap.key
      this.state.todos.push(obj)
      this.setState({ todos: this.state.todos })
    })
  }

  addTodo(ev) {
    ev.preventDefault()
    let refRoot = firebase.database().ref('/todo/')
    refRoot.push({ todo: this.refs.todo.value })
  }

  itemRemove(val) {
    let refRoot = firebase.database().ref(`/todo/${val.id}`)
    refRoot.remove().then((i) => {

      let allTodos = this.state.todos;
      let removeIndex;
      for (var i = 0; i < allTodos.length; i++) {
        if (allTodos[i].id === val.id) {
          removeIndex = i
        }
      }
      allTodos = allTodos.slice(0, removeIndex).concat(allTodos.slice(removeIndex + 1))
      this.setState({ todos: allTodos })
      console.log(allTodos)
    })
  }


  render() {
    return (
      <div>
        <center>  <h2 style={headingStyle}>Welcome to React Todo</h2> </center>

        <form className="container form-group" onSubmit={this.addTodo}>
          <div className="row">
            <div className="form-group">
              <div className="col-md-10 text-center">
                <input type="text" placeholder="Add Item " className="form-control" ref="todo" />

              </div>
              <div className="col-md-2 text-center">
                <button className="btn btn-primary">Add Todo</button>

              </div>
            </div>
          </div>
        </form>
        {this.state.todos.map((value, index) => {
          return (
            <h2 key={index}>
              <div className="container form-group">
                <div className="row">
                  <ul>
                    <li className="form-group" key={index}> <span className="col-md-8 text-center">{value.todo}</span>
                      <button className="btn btn-danger" onClick={this.itemRemove.bind(this, value)}>Delete Task</button></li>
                  </ul>
                </div>
              </div>
            </h2>
          )
        })}
      </div>
    );
  }
}

export default Todo;