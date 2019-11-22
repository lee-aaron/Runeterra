import React from 'react';
import './Card.css';
import { Image } from 'react-bootstrap';
import { useDrag } from 'react-dnd';

const Card = ({card, bucket, handleBucketChange}) => {

  card.type = 'Card';

  const [{ opacity }, drag] = useDrag({
    item: card,
    end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if ( !dropResult && bucket ) {
        bucket.splice(bucket.indexOf(card), 1);
        card.count += 1;
      }
      handleBucketChange();
    },
    collect: monitor => ({
      opactiy: monitor.isDragging() ? 0.4 : 1
    })
  })

  return (
    <div ref={drag} className="card-body">
      <Image className="card-image" src={"http://localhost:3001/runeterra/image/" + card.cardCode} />
      <h3 className="card-overlay">{card.count}</h3>
    </div>
  )
}

export default Card;