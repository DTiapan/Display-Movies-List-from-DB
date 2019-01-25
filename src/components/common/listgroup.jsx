import React from "react";

const Listgroup = props => {
  const { items, onItemSelect, selectedItem, countedGeners } = props;
  //console.log(items.length);
  //return null;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item + "1"}
          className={
            item === selectedItem
              ? "list-group-item d-flex justify-content-between align-items-center active"
              : "list-group-item d-flex justify-content-between align-items-center"
          }
        >
          {item}
          <span className="badge badge-primary badge-pill">
            {countedGeners[item]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Listgroup;
