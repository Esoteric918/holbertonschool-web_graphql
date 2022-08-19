import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
const { gql } = require('apollo-boost');
const { graphql } = require('react-apollo');



function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

  // console.log(props);
  function displayTasks() {
    console.log(props.data);
    var data = props.data;

    if (data.loading) {
      return ( <div> Loading tasks... </div> );
    } else {
      return data.tasks.map(task => {
        return (
          <li
            key = {task.id}
            onClick = {(e) => {
              setState({
                selected: task.id
              });
            }}
          >
            {task.title}
          </li>
        );
      })
    }
  }
  return (
    <div>
      <ul id = "task-list" >
        {displayTasks()}
      </ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
}


const getTasksQuery = gql`
{
  tasks {
    id
    title
  }
}
`

// export default TaskList;
export default graphql(getTasksQuery)(TaskList);
