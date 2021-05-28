import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  state={
    // tasks:[], //id:unique, name, status
    isDisplay:false,
    filter:{
      name:'',
      status:-1
    },
    keyword:'',
    sort:{
      by:'name',
      value:1
    }
  }
  // componentDidMount=()=>{
  //  if(localStorage && localStorage.getItem('task')){
  //    var tasks=JSON.parse(localStorage.getItem('task'));
  //    this.setState({tasks:tasks});
  //  }
  // }
  // onGenerateData=(e)=>{
  //   var tasks=[
  //     {
  //       id:this.generateID(),
  //       name:'Học Lập Trình',
  //       status:true
  //     },
  //     {
  //       id:this.generateID(),
  //       name:'Đi Bơi',
  //       status:true
  //     },
  //     {
  //       id:this.generateID(),
  //       name:'Ngủ',
  //       status:false
  //     }
  //   ]
  //   this.setState({
  //     tasks:tasks
  //   })
  //   localStorage.setItem('task',JSON.stringify(tasks));
  // }
  onDisplayForm=()=>{
    var{taskEditing}=this.props;
    if(taskEditing && taskEditing.id!==''){
      this.props.onOpenForm();
    }
    else{
      this.props.onToggleForm();
      
    }
    this.props.onEditTask({
      id:'',
      name:'',
      status:true
    })
  }
  onCloseForm=()=>{
    this.setState({isDisplay:false})
  }
  onShowForm=()=>{
    this.setState({isDisplay:true})
  }
  onSubmit=(data)=>{
    var {tasks}=this.state;
    if(data.id===''){
      data.id=this.generateID();
      tasks.push(data);
    }
    else{
      var index=this.findIndex(data.id);
      tasks[index]=data;
    }   
    this.setState({
      tasks:tasks,
      taskEditing:null
    })
    localStorage.setItem('task',JSON.stringify(tasks));
    this.onCloseForm();

  }
  // onToggleStatus=(id)=>{
  //   var {tasks}=this.state;
  //   var index=this.findIndex(id);
  //   console.log(index);
  //   if(index!==-1){
  //     tasks[index].status=!tasks[index].status;
  //     this.setState({
  //       tasks:tasks,
  //     })
  //     localStorage.setItem('task',JSON.stringify(tasks));
  //   }
  // }
  findIndex=(id)=>{
    var {tasks}=this.state;
    var result=-1;
    tasks.forEach((item,index)=>{
        if(item.id===id){
          result=index;
        }
    })
    return result;
  }
  onDelete=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    if(index!==-1){
      tasks.splice(index,1);
      this.setState({tasks:tasks});
      localStorage.setItem('task',JSON.stringify(tasks));
      
    }
    this.onDisplayForm();
  }

  // onFilter=(filterName,filterStatus)=>{
  //   filterStatus=parseInt(filterStatus);
  //   this.setState({
  //     filter:{
  //       name:filterName.toLowerCase(),
  //       status:filterStatus
  //     }
  //   })
  // }
  onSearch=(data)=>{
    this.setState({keyword:data.toLowerCase()})
  }
  onSort=(sortBy,sortValue)=>{
    console.log(sortBy,sortValue);
    sortValue=parseInt(sortValue);
    this.setState({
      sort:{
        by:sortBy,
        value:sortValue
      }
    })
  }
  

  render() {
    var {filter,keyword,sort}=this.state; // code này tương đương với var task=this.state.task
    var {isDisplayForm}=this.props;
    console.log(this.state);
    // if(filter){
    //   if(filter.name){
    //     tasks=tasks.filter((task)=>{
    //       return task.name.toLowerCase().indexOf(filter.name)!==-1
    //     });
    //   }
    //   tasks=tasks.filter((task)=>{
    //     if(filter.status===-1){
    //       return task
    //     }
    //     else{
    //       return task.status===(filter.status===1?true:false)
    //     }
    // })
    // }
    // if(keyword){
    //   tasks=tasks.filter((task)=>{
    //     return task.name.toLowerCase().indexOf(keyword)!==-1
    //   })
    // }
    // if(sort.by==='name'){
    //   tasks.sort((a,b)=>{
    //     if(a.name>b.name) return sort.value;
    //     else if(a.name<b.name) return -sort.value;
    //     else return 0
    //   });
    // }
    // else{
    //   tasks.sort((a,b)=>{
    //     if(a.status>b.status) return -sort.value;
    //     else if(a.status<b.status) return sort.value;
    //     else return 0
    //   });
    // }
    console.log(filter);
    // var elementTaskForm=isDisplayForm===true?<TaskForm 
    // // setDisplay={this.onDisplayForm}
    // // onSubmit={this.onSubmit}
    // taskEditing={taskEditing}
    // >
    // </TaskForm>:null;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <TaskForm 
          // setDisplay={this.onDisplayForm}
          // onSubmit={this.onSubmit}
          >
          </TaskForm>
          </div>
          <div className={isDisplayForm===true?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onDisplayForm}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
             {/* <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
              Generate Data
            </button> */}
              <Control 
              // onSearch={this.onSearch} 
              // onSort={this.onSort} sortBy={this.state.sort.by} sortValue={this.state.sort.value}
              ></Control>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onDelete={this.onDelete} onUpdate={this.onUpdate} 
                //onFilter={this.onFilter}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps=(state)=>{
  return{
    isDisplayForm:state.isDisplayForm,
    taskEditing:state.taskEditing
  }
}
const mapDispathToProps=(dispath,props)=>{
  return {
    onToggleForm:()=>{
      dispath(actions.toggleForm())
    },
    onOpenForm:()=>{
      dispath(actions.openForm())
    },
    onEditTask:(task)=>{
      dispath(actions.editTask(task));
    }
  }
}
export default connect(mapStateToProps,mapDispathToProps)(App);