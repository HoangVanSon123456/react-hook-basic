import { useEffect, useState } from "react";
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFiltersFrom from "./components/PostFiltersFrom";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        const { data, pagination } = responseJSON;
        setPosts(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Error" + error);
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }
  return (
    <div className="app">
      <h1>Hello Sown</h1>
      {/* <ColorBox /> */}
      {/* <TodoList todos={todoList} onToDoClick={handleTodoClick} />
      <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      <PostFiltersFrom onSubmit={handleFiltersChange} />
      <PostList posts={posts} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
