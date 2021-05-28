import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
    toggleStatus=()=>{
        this.props.onUpdateStatus(this.props.id);
    }
    onDelete=()=>{
        this.props.onDeleteTask(this.props.id);
    }
    // onUpdate=()=>{
    //     // this.props.onUpdate(this.props.id);
    //     this.props.onOpenForm();

    // }
    onEditTask=()=>{       
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }
    render() {
        return (
            <tr>
                <td>{this.props.stt+1}</td>
                <td>{this.props.name}</td>
                <td className="text-center">
                <span onClick={this.toggleStatus} className={this.props.status===true?"label label-danger":"label label-success"}>
                    {this.props.status===true?"Kích hoạt":"Ẩn"}
                </span>
                </td>
                <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                    <span className="fa fa-pencil mr-5" />Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                    <span className="fa fa-trash mr-5" />Xóa
                </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        taskEditing:state.taskEditing,
    }
  }
  const mapDispathToProps=(dispath,props)=>{
    return {
     onUpdateStatus:(id)=>{
        dispath(actions.updateStatus(id));
     },
     onDeleteTask:(id)=>{
        dispath(actions.deleteTask(id));
     },
     onOpenForm:()=>{
        dispath(actions.openForm());
     },
     onEditTask:(task)=>{
         dispath(actions.editTask(task));
     }
    }
  }
export default connect(mapStateToProps,mapDispathToProps)(TaskItem);