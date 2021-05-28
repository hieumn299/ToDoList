import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {
    state={
        filterName:'',
        filterStatus:-1, //-1 là tất cả, 1 là hiện, 0 là ẩn 
    }
    onToggleStatus=(id)=>{
        this.props.onToggleStatus(id);
    }
    onDelete=(id)=>{
        this.props.onDelete(id);
    }
    onUpdate=(id)=>{
        this.props.onUpdate(id);
    }
    onChange=(e)=>{
        var target=e.target;
        var name=target.name;
        var value=target.type==='checkbox'?target.checked:target.value;  
        var filter={
            name:name==='filterName'?value:this.state.filterName,
            status:name==='filterStatus'?value:this.state.filterStatus
        }  
        this.setState({
            [name]:value
        })
        this.props.onFilterTable(filter)
        // this.props.onFilter(
        //     name==='filterName'?value:this.state.filterName,
        //     name==='filterStatus'?value:this.state.filterStatus
        // )
    }
    
    render() {
        var {filterName,filterStatus}=this.state;
        var {filterTable,tasks,keyWord,sort}=this.props;
        console.log(keyWord);
        console.log(filterTable);
        //filter on table
        if(filterTable){
            if(filterTable.name){
              tasks=tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filterTable.name)!==-1
              });
            }
            tasks=tasks.filter((task)=>{
              if(filterTable.status===-1){
                return task
              }
              else{
                return task.status===(filterTable.status===1?true:false)
              }
          })
        }
        if(keyWord){
            tasks=tasks.filter((task)=>{
              return task.name.toLowerCase().indexOf(keyWord)!==-1
            })
        }
        if(sort.sortBy==='name'){
            tasks.sort((a,b)=>{
              if(a.name>b.name) return sort.sortValue;
              else if(a.name<b.name) return -sort.sortValue;
              else return 0
            });
          }
          else{
            tasks.sort((a,b)=>{
              if(a.status>b.status) return -sort.sortValue;
              else if(a.status<b.status) return sort.sortValue;
              else return 0
            });
          }
        console.log(this.props.sort);
        tasks=tasks.map((taskitem,index)=>{
        return <TaskItem key={taskitem.id} task={taskitem} stt={index} name={taskitem.name} status={taskitem.status} id={taskitem.id}  onDelete={this.onDelete} 
        // onUpdate={this.onUpdate}
        ></TaskItem>
        })
        // console.log(task);
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td />
                    <td>
                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange} />
                    </td>
                    <td>
                    <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích Hoạt</option>
                    </select>
                    </td>
                    <td />
                </tr>
                {tasks}
                
                </tbody>
            </table>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        tasks:state.tasks, //tasks này là tên bên reducer,
        filterTable:state.filterTable,
        keyWord:state.keyWord,
        sort:state.sort
    }
}
const mapDispathToProps=(dispath,props)=>{
    return {
        onFilterTable:(filter)=>{
            dispath(actions.filterTask(filter));
        }
    }
}
export default connect(mapStateToProps,mapDispathToProps)(TaskList);