'use client';
import Link from 'next/link';
import { styles } from './styles';
import { HEADER_TEXT, BUTTON_TEXT } from './constants';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>{HEADER_TEXT}</h1>
      <Link key={'advocatesList'} href={'/advocatesList'} style={styles.buttonContainer}>
        <p style={styles.buttonText}>{BUTTON_TEXT}</p>
      </Link>
    </div>
  );
}
