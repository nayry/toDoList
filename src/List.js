import React from 'react';
import './List.css'
import Items from './Items'

class List extends React.Component {
  constructor(props){
    super(props);
    this.updateCurrentItem = this.updateCurrentItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.state = {
      id: this.props.id,
      items: [],
      currentItem:{
        checked: false,
        value:'',
        id:''
      }
    }
  }

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    this.setData();
  }

  //get data from localStorage
  getData(){
    const localItems = JSON.parse(localStorage.getItem(this.state.id));
    if(localItems){
      this.setState({
        items: localItems
      })
    }
  }

  //set data to localStorage
  setData(){
    localStorage.setItem(this.state.id, JSON.stringify(this.state.items));
  }

  //update the current value inside the input field
  updateCurrentItem(event){
    this.setState({
        currentItem:{
          checked: false,
          value: event.target.value,
          id: Date.now()
        }
    })
  }

  //add a new item
  addItem(){
    if(this.state.currentItem.value !== ''){
      const items = [...this.state.items, this.state.currentItem];
      this.setState({
        items: items,
        currentItem: {
          checked: false,
          value: '',
          id: ''
        }
      })
    }
  }

  //update an existing item
  updateItem(value, id){
    const items = this.state.items;
    items.map(item=>{
      if(item.id===id){
        item.value = value;
      }
      return 0;
    })
    this.setState({
      items: items
    })
  }

  //delete an existing item
  deleteItem(key){
    const newList = this.state.items.filter(item => item.id!==key);
    this.setState({
      items: newList
    })
  }

  //check the item as complete or incomplete
  checkBox(id){
    const items = this.state.items;
    items.map(item=>{
      if(item.id===id){
        item.checked = !item.checked;
      }
      return 0;
    })
    this.setState({
      items: items
    })
  }

  render(){
    return (
      <div className="list">
      <h1><input value={this.props.name} className="name" onChange={(event)=>{this.props.updateName(
        event.target.value, this.state.id
      )}}/></h1>
      <div id="addItem">
      <input className="content" type="text" placeholder="Enter Item Name" value={this.state.currentItem.value} onChange={this.updateCurrentItem}/>
      <button onClick={this.addItem} className="addItem">Add</button>
      </div>
      <Items items={this.state.items} updateItem={this.updateItem} deleteItem={this.deleteItem} checkBox={this.checkBox}/>
      <span className="glyphicon glyphicon-trash" id="deleteList" onClick={(event) => {
        this.props.deleteList(this.state.id)}}></span>
      </div>
    );
  }
}

export default List;
