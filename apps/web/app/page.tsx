'use client';

import { Button } from 'ui';

import styles from '../styles/index.module.css';

// eslint-disable-next-line import/no-default-export
export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log('Pressed!')} text="Boop" />
    </div>
  );
}
