import "./App.css";
import React, { useState, useEffect} from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  let pageSize = 10;
  let pagesNumbers;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage;
        let staetIndex = endIndex - pageSize;
        let allShownTodos = datas.slice(staetIndex, endIndex);
        setPaginatedTodos(allShownTodos);
      });
  }, []);
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let staetIndex = endIndex - pageSize;
    let allShownTodos = todos.slice(staetIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  }, [currentPage]);
  
  const changedPagnatid = (newpage) => {
    setCurrentPage(newpage);
  };
  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());

  return (
    <>
      {!todos ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.map((todo) => (
              <tr>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p
                    className={
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todo.completed ? " Complated" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination" aria-current="page">
          {pagesNumbers.map((pageNumber) => (
            <li
              className={
                pageNumber + 1 === currentPage
                  ? "page-item active"
                  : "page-item"
              }
              key={pageNumber + 1}
              onClick={() => changedPagnatid(pageNumber + 1)}
            >
              <span className="page-link">{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default App;
