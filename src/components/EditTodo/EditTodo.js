import React, { Component, createRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class EditTodo extends Component {
  state ={
    tags: {
      selfCare: '🌱 self care',
      chore: '🧹 chore',
      work: '💼 work'
    },
    task: {
      tag: '',
      task: '',
      description: '',
      dueDate: '',
      hashKey: 0
    },
    default_task: {
      tag: '',
      task: 'task name',
      description: 'task description',
      dueDate: '',
      hashKey: 0
    },
    ref: {
      tagRef: createRef(),
      taskRef: createRef(),
      descriptionRef: createRef(),
      dateRef: createRef()
    }
  }

  componentDidMount() {
    let task = {};

    console.log(this.props);

    //false = creating a new task
    if (!this.props.task) {
      let defTask = {...this.state.default_task};
      defTask.tag = this.state.tags.selfCare;
      task = defTask;
    }

    // true = editing an existing task
    else {
      task = {
        tag: this.props.task.tag,
        task: this.props.task.taskName,
        description: this.props.task.taskDescription,
        dueDate: this.props.task.dueDate,
        hashKey: this.props.task.hashKey
      }
    }

    console.log(task);
    this.setState({task: task});
  }

  dropdownHandler = event => {
    console.log('[dropdownHandler]: ' + event);

    let task = {
      ...this.state.task,
      tag: event
    };

    this.setState({ task });
  }

  onSubmit = () => {
    console.log('[onSubmit]');

    const {ref} = this.state;
    const oldTask = this.props.task;

    const updatedTask = {
      tag:              ref.tagRef.current.innerText,
      taskName:         ref.taskRef.current.value,
      taskDescription:  ref.descriptionRef.current.value,
      dueDate:          ref.dateRef.current.value
    }

    // if this is a new task
    if (!oldTask){
      // check that there's a name at least
      if (updatedTask.task === '') {
        alert("please choose a task name");
        return;
      }
      // submit new task
      const updatedHashKey = this.props.hashGen(updatedTask);
      const oldHashKey = 0;
      updatedTask.hashKey = updatedHashKey;

      this.props.submitClicked(updatedTask, oldHashKey);

      // reset fields
      ref.taskRef.current.value = '';
      ref.descriptionRef.current.value = '';
      ref.dateRef.current.value = '';

      let defTask = {
        ...this.state.default_task,
        tag: this.state.tags.selfCare
      };

      this.setState({ task: defTask });
    }
    else {

    }


  }


  render () {

    const { task, tags, ref } = this.state;

    return (
      <tr>
        <td>
          <DropdownButton
            id="dropdown-basic-button"
            title={task.tag}
            ref={ref.tagRef}>

            <Dropdown.Item
              // href={'#' + chore}
              onSelect={this.dropdownHandler}
              eventKey={tags.chore}>
              {tags.chore}
            </Dropdown.Item>

            <Dropdown.Item
              // href={'#' + work}
              onSelect={this.dropdownHandler}
              eventKey={tags.work}>
              {tags.work}
            </Dropdown.Item>

            <Dropdown.Item
              // href={'#' + selfCare}
              onSelect={this.dropdownHandler}
              eventKey={tags.selfCare}>
              {tags.selfCare}
            </Dropdown.Item>

          </DropdownButton>

        </td>
        <td>
          <input
            type="text"
            placeholder={task.task}
            ref={ref.taskRef}/>
        </td>
        <td>
          <input
            type="text"
            placeholder={task.description}
            ref={ref.descriptionRef}/>
        </td>
        <td>
          <input
            type="date"
            placeholder={task.dueDate}
            ref={ref.dateRef}/>
        </td>
        <td>
          <button
            onClick={this.onSubmit}>
            ✅
          </button>
        </td>
      </tr>
    );
  }
}

export default EditTodo;