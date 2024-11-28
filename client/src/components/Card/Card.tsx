import React from 'react';
import styles from './Card.module.scss';

function Card({ name, manaCost, type }) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>Mana Cost: {manaCost}</p>
      <p>Type: {type}</p>
    </div>
  );
}

export default Card;