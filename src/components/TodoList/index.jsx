import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onToDoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onToDoClick : null,
}

export default function TodoList(props) {
   const {todos , onToDoClick} = props;

   function handleClick(todo) {
        if(onToDoClick) {
            onToDoClick(todo);
        }
   }
   console.log(todos)
    return (
        <ul className="todo-list">
        {todos.map(todo => (
            <li key={todo.id} onClick={() => handleClick(todo)}>{todo.title}</li>
        ))}
       </ul>
       
    );
}

