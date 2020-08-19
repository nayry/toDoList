import React from 'react';
import './Items.css'


const Items = ({items, updateItem, deleteItem, checkBox}) => {
  const listItems = items.map((item) => {
    return (<div className="item" key={item.id}>
      <input className="itemText" type="text" value={item.value} id={item.id} onChange={(event) => {
        updateItem(event.target.value, item.id);}}/>
        {item.checked ?
          <input type="checkbox" onChange={(event) => {
            checkBox(item.id);}} checked/>
        :
          <input type="checkbox" onChange={(event) => {
            checkBox(item.id);}}/>
        }
      <span className="glyphicon glyphicon-trash" id="item" onClick={(event) => {
        deleteItem(item.id);}}></span>
    </div>)
  })

  return(
    <div>
      {listItems}
    </div>
  );
}

export default Items;
