'use client'
import { useState } from 'react'
import classNames from 'classnames'

import styles from './TrackList.module.scss'

export default function TrackList (props) {
  const { discs = [], tDisc } = props
  const [current, setCurrent] = useState(0)

  return (
    <>
      <div className='row'>
        {discs.map(({ number }, i) => (
          <div key={number} className='col px-0'>
            <button
              type="button" className={classNames(styles.discTab, 'w-100 btn btn-outline-light rounded-0 py-2')}
              style={{ borderRightStyle: discs.length - 1 === i ? 'solid' : 'hidden' }}
              disabled={current === number} onClick={() => setCurrent(number)}>
              {tDisc} {number + 1}
            </button>
          </div>
        ))}
      </div>
      <div className='row'>
        <div className={classNames('col', styles.trackBox)}>
          <table cellSpacing='0' cellPadding='1' border='0'>
            <tbody>
              {discs.length > 0 && discs[current].body.split('\n').map((track, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <span className='label'>{i + 1}</span>
                    </td>
                    <td width='100%'>{track}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
