import React from 'react';
import './App.css';
import TodoService from './Todo.service';

function ListItem(props) {

  const todo = props.todo;

  return (
    <div className="todo-list-item">
      <span id="text">
        <input checked={todo.completed} onChange={() => props.toggleCompletedHandler(todo)} type="checkbox"/>
        <span>{todo.text}</span>
      </span>

      <span id="action-buttons">
        <button onClick={() => props.editHandler(todo)}>Edit</button>
        <button onClick={() => props.deleteHandler(todo)}>Delete</button>
      </span>
    </div>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todos: []
    };
  }

  componentDidMount() {
    // Get all todos
    TodoService.getTodos().then(res => {
      const docs = res.docs;
      const todos = docs.map(doc => {
        return doc.data();
      });
      // Set all todos to state
      this.setState({todos});
    });
  }

  edit = (todo) => {
    const text = prompt("I want to....", todo.text);

    const updatedTodo = {
      ...todo,
      text: text
    };

    TodoService.editTodo(updatedTodo).then(_ => {
      const newTodos = this.state.todos.map(t => {
        if(t.id === todo.id) {
          return updatedTodo;
        }
        return t;
      });
  
      this.setState({todos: newTodos});
    });
    
  }

  delete = (todo) => {
    const id = todo.id;

    TodoService.deleteTodo(id).then(_ => {
      const newTodos = this.state.todos.filter(t => t.id !== id);
      this.setState({
        todos: newTodos
      });
    });

  }

  toggleCompleted = (todo) => {

    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };

    TodoService.editTodo(updatedTodo).then(_ => {
      const newTodos = this.state.todos.map(t => {
        if(t.id === todo.id) {
          return updatedTodo;
        }
        return t;
      });
  
      this.setState({todos: newTodos});
    });

  }

  handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: TodoService.getRandomFirebaseID('Todos'),
      text: this.state.todo,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    TodoService.addTodo(todo).then(res => {
      const newTodos = [...this.state.todos, todo];
    
      this.setState({
        todos: newTodos,
        todo: ''
      });

    });

  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value
    });
  }

  render() {

    return (
      <div className="App">
  
        <form id="input-controls" onSubmit={this.handleSubmit}>
          <input value={this.state.todo} onChange={this.handleChange} placeholder="I want to...." />
          <button type="submit">Add</button>
        </form>
  
        <div id="todo-list">
          {
            this.state.todos.map(todo => (
              <ListItem
                key={Math.random()}
                todo={todo}
                editHandler={this.edit}
                deleteHandler={this.delete}
                toggleCompletedHandler={this.toggleCompleted}
              />
            ))
          }
        </div>
  
      </div>
    );
  }
}

export default App;
