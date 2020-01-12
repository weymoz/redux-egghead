import React, { useEffect } from "react";
import TodoList from "./TodoList";
import { getVisibleTodos } from "./reducer";
import { connect } from "react-redux";
import { toggleTodo, fetchTodos } from "./actions";
import { withRouter } from "react-router";

let VisibleTodoList = props => {
  const { fetchTodos, filter } = props;

  const fetchData = () => {
    fetchTodos(filter);
  };

  useEffect(fetchData, [filter]);

  return <TodoList {...props} />;
};

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";

  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, {
    onTodoClick: toggleTodo,
    fetchTodos
  })(VisibleTodoList)
);

export default VisibleTodoList;
