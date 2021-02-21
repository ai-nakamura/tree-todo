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
      taskName: '',
      taskDescription: '',
      dueDate: '',
      hashKey: 0
    },
    default_task: {
      tag: '',
      taskName: 'task name',
      taskDescription: 'task description',
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

    //false = creating a new task
    if (!this.props.task) {
      let defTask = { ...this.state.default_task };
      defTask.tag = this.state.tags.selfCare;
      task = defTask;
    }

    // true = editing an existing task
    else {
      task = {
        tag:             this.props.task.tag,
        taskName:        this.props.task.taskName,
        taskDescription: this.props.task.taskDescription,
        dueDate:         this.props.task.dueDate,
        hashKey:         this.props.task.hashKey
      }

      const refs = { ...this.state.ref };
      refs.taskRef.current.value        = this.props.task.taskName;
      refs.descriptionRef.current.value = this.props.task.taskDescription;
      refs.dateRef.current.value        = this.props.task.dueDate;
    }

    this.setState({ task: task });
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

    const currTask = {
      tag:              ref.tagRef.current.innerText,
      taskName:         ref.taskRef.current.value,
      taskDescription:  ref.descriptionRef.current.value,
      dueDate:          ref.dateRef.current.value
    }

    // if this is a new task
    if (!oldTask){
      // check that there's a name at least
      console.log('submitting new task');
      if (currTask.task === '') {
        alert("please choose a task name");
        return;
      }
      else if (
        currTask.taskName         === '' &&
        currTask.taskDescription  === '' &&
        currTask.dueDate          === ''
      )  {
        this.props.submitClicked('empty new task');
        return;
      }
      // submit new task
      const updatedHashKey = this.props.hashGen(currTask);
      const oldHashKey = 0;
      currTask.hashKey = updatedHashKey;

      this.props.submitClicked(currTask, oldHashKey);

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

    // else this is an existing task
    else {

      console.log('submitting existing task');
      const oldTask = {...this.props.task};
      const newTask = {
        tag:             ref.tagRef.current.innerText,
        taskName:        ref.taskRef.current.value,
        taskDescription: ref.descriptionRef.current.value,
        dueDate:         ref.dateRef.current.value,
      }

      // no change detected
      if (
        newTask.tag             === oldTask.tag &&
        newTask.taskName        === oldTask.taskName &&
        newTask.taskDescription === oldTask.taskDescription &&
        newTask.dueDate         === oldTask.dueDate
      ) {
        console.log('nothing changed');
        this.props.submitClicked(null);
        return;
      }

      // else, something changed
      else {

        const oldHashKey = this.props.task.hashKey;
        const newHashKey = (
          this.props.hashGen(
            newTask.tag,
            newTask.taskName,
            newTask.taskDescription,
            newTask.dueDate
          )
        );
        newTask.hashKey = newHashKey;

        this.props.submitClicked(newTask, oldHashKey);

      }
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
            placeholder={task.taskName}
            ref={ref.taskRef}/>
        </td>
        <td>
          <input
            type="text"
            placeholder={task.taskDescription}
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