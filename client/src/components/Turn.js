import React from 'react';
import './Turn.css';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Items = {
  Card: 'Card'
}

const Turn = ({ name, bucket, handleDrop, handleBucketChange }) => {

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
      <div className="modal-bucket-title">{name}</div>
      {bucket.map((card, index) => (
        <Card key={card.cardCode + "-" + index} card={card} bucket={bucket} handleBucketChange={handleBucketChange} />
      ))}
    </div>
  );
}

export default Turn;