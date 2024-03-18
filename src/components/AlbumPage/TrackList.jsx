'use client'
import { useState } from 'react'
import clsx from 'clsx'

import styles from './TrackList.module.scss'

export default function TrackList(props) {
  const { discs = [], tDisc } = props
  const [current, setCurrent] = useState(0)

  return (
    <>
      <div className={clsx('row', styles.discTabRow)}>
        {discs.length > 1
          ? discs.map(({ number }, i) => (
              <div key={number} className='col'>
                <button
                  type='button'
                  className={clsx(
                    styles.discTab,
                    'w-100 btn btn-outline-light rounded-0 py-2'
                  )}
                  style={{
                    borderRightStyle:
                      discs.length - 1 === i ? 'solid' : 'hidden'
                  }}
                  disabled={current === number}
                  onClick={() => setCurrent(number)}
                >
                  {tDisc} {number + 1}
                </button>
              </div>
            ))
          : null}
      </div>
      <div className='row flex-grow-1'>
        <div className='col'>
          <div
            className={clsx(styles.trackBox, {
              [styles.single]: discs.length === 1
            })}
          >
            <table cellSpacing='0' cellPadding='1' border='0'>
              <tbody>
                {discs.length > 0 &&
                  discs[current].body.split('\n').map((track, i) => (
                    <tr key={i}>
                      <td>
                        <span className='label'>{i + 1}</span>
                      </td>
                      <td width='100%'>{track}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
