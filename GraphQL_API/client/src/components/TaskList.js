import {
  useState,
//useEffect
 } from "react";

// components
import TaskDetails from "./TaskDetails";
import gql from "apollo-boost";
const graphql = require("react-apollo");

function TaskList(props) {
  const [state, setState] = useState({
    selected: null,
  });

  function displayTasks() {
    console.log(props.data);
    var data = props.data;

    if (data.loading) {
      return <div> Loading tasks... </div>;
    } else {
      return data.tasks.map((task) => {
        return (
          <li
            key={task.id}
            onClick={(e) => {
              setState({
                selected: task.id,
              });
            }}
          >
            {task.title}
          </li>
        );
      });
    }
  }
  return (
    <div>
      <ul id="task-list"> {displayTasks()} </ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
}

// query to get all tasks
const getTasksQuery = gql`
  query tasks {
      id
      title
    }
  }`;
export default graphql(getTasksQuery)(TaskList);
