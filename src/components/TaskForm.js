import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
    state={
        id:'',
        name:'',
        status:true
    }
    componentDidMount=()=>{
        if(this.props.taskEditing){
            this.setState({
                id:this.props.taskEditing.id,
                name:this.props.taskEditing.name,
                status:this.props.taskEditing.status,
            })
        }
        else{
            this.onClear();
        }
    }
    componentDidUpdate=(prevProps,prevState)=>{
        console.log(prevState);
        console.log(this.state);
        if(this.state===prevState&&this.props.taskEditing!==null){
            this.setState({
                id:this.props.taskEditing.id,
                name:this.props.taskEditing.name,
                status:this.props.taskEditing.status,
            })
        }
        // else if(prevProps.taskEditing===null){
        //     this.setState({
        //         id:'',
        //         name:'',
        //         status:'',
        //     })
        // }
        else{
            return false
        }
    }
    setDisplay=()=>{
        this.props.onCloseForm();
    }
    onChange=(e)=>{
        var name=e.target.name;
        var value=e.target.value;
        if(name==='status'){
            value=e.target.value==='true'?true:false
        }
        this.setState({
            [name]:value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state);
        // this.props.onSubmit(this.state);
        this.props.onSaveTask(this.state);
        this.onClear();
    }
    onClear=()=>{
        this.setState({
            name:'',
            status:true
        });
        // this.setDisplay();
    }
    render() {
        console.log(this.props.taskEditing);
        console.log(this.state);
        if(this.props.isDisplayForm===false) return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id!==''?"Cập nhật công việc":"Thêm công việc"}
                    <span onClick={this.setDisplay} style={{float:"right"}} className="fa fa-times-circle text-right" />
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                    </form>
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
        onSaveTask:(task)=>{
            dispath(actions.saveTask(task))
        },
        onCloseForm:()=>{
            dispath(actions.closeForm())
        },
        onOpenForm:()=>{
            dispath(actions.openForm());
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps)(TaskForm);