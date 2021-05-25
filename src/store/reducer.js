const initialState = {
  networkError: false,
  token: null,
  tasks: [],
  // tags: [] // eventually
}

function reducer (state = initialState, action) {

  switch (action.type) {

    case 'INIT':
      return {
        ...state,
        tasks: action.fetchedData
      };

    // database access
    // networkError: true or false
    case 'NET_ERR':
      return {
        ...state,
        networkError: action.netErr
      };

    case 'SET_TASK_LIST':
      console.log('[reducer] SET_TASK_LIST: ');
      // console.log(action.newTaskList, action.index);

      // new task
      if (action.index >= state.tasks.length) {
        console.log('new task received');
      }

      return {
        ...state,
        tasks: action.newTaskList
      };

    case 'DELETE_TASK':
      const newTasks = state
        .tasks.filter( task =>
        task.hashKey !== action.hashKey
      )
      console.log(newTasks);
      return {
        ...state,
        tasks: newTasks
      }


    // sorting...
    // sort tasks by dueDate
    case 'dueDate':
      console.log(action.type);
      return;

    // sort tasks by tag
    case 'tag':
      console.log(action.type);
      return;

    // sort tasks by task name
    case 'task':
      console.log(action.type);
      return;

    // auth...
    // TODO: replace with real token storage
    case 'AUTH_ADD_TOKEN':
      localStorage.setItem('email', action.email);
      localStorage.setItem('password', action.password);
      localStorage.setItem('token', action.token);
      console.log(action.email, action.password);
      return {
        ...state,
        token: 'token'
      }
    case 'CLEAR_TOKEN':
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      localStorage.removeItem('token')
      return {
        ...state,
        token: null
      }

    default:
      console.log(action);
      return state;
  }

  // return state;
}

export default reducer;