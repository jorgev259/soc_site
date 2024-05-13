import clsx from 'clsx'

import { Link } from '@/next/utils/navigation'

import styles from '@/styles/LetterList.module.scss'

export default function LetterList({ letters }: { letters: string[] }) {
  return letters.map((letter) => (
    <Link
      key={letter}
      className={clsx(styles.letter, 'btn btn-secondary p-2 m-1')}
      href={`#${letter}`}
    >
      <h2>{letter}</h2>
    </Link>
  ))
}
