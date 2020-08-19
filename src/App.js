import React from 'react';
import './App.css';
import List from './List';


class App extends React.Component {
  constructor(props){
    super(props);
    this.updateName = this.updateName.bind(this);
    this.updateList = this.updateList.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.state = {
      currentList: {
        id: '',
        name: ''
      },
      lists: []
    }
  }

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    this.setData();
    if(this.state.lists.length === 0){
      localStorage.removeItem('localLists');
    }
  }

  //get data from localStorage
  getData(){
    const localLists = JSON.parse(localStorage.getItem('localLists'));
    if(localLists){
      this.setState({
        lists: localLists
      })
    }
  }

  //set data to localStorage
  setData(){
    localStorage.setItem('localLists', JSON.stringify(this.state.lists));
  }

  //update the current value inside the input field
  updateList(event){
    this.setState({
      currentList:{
        id: Date.now(),
        name: event.target.value
      }
    })
  }

  //add a new list
  addList(){
    if(this.state.currentList.name !== ''){
      const lists = [...this.state.lists, this.state.currentList];
      this.setState({
        lists: lists,
        currentList: {
          id: '',
          name: ''
        }
      })
    }
  }

  //update the name of an existing list
  updateName(value, id){
    const lists = this.state.lists;
    lists.map(list =>{
      if(list.id === id){
        list.name = value;
      }
      return 0;
    })
    this.setState({
      lists: lists
    })
  }

  //delete and existing list
  deleteList(id){
    const newList = this.state.lists.filter(list => list.id !== id);
    this.setState({
      lists: newList
    })
    localStorage.removeItem(id);
  }

  render(){
    return (
      <div className="App">
       <div className="addList">
      <input type="text" placeholder="Enter List Name" value={this.state.currentList.name} onChange={this.updateList}/>
      <button onClick={this.addList}><span className="glyphicon glyphicon-plus"></span></button>
      </div>
      <div className="lists">
      {
        this.state.lists.map((list)=>{
          return(
              <List name={list.name} id={list.id} key={list.id} updateName={this.updateName} deleteList={this.deleteList}/>
          )
        })
      }
      </div>
      </div>
    );
  }
}

export default App;
