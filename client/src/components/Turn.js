import React from 'react';
import './Turn.css';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Items = {
  Card: 'Card'
}

const Turn = ({ name, bucket, handleDrop }) => {

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: Items.Card,
    drop: (card) => {
      bucket.push(card);
      handleDrop(card);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (card, monitor) => {
      if ( card.count <= 0) {
        return false;
      }
      return true;
    }
  })

  return (
    <div ref={drop} className="modal-bucket">
      {name}
      {bucket.map((card, index) => (
        <Card key={card.cardCode + "-" + index} card={card} bucket={bucket} />
      ))}
    </div>
  );
}

export default Turn;