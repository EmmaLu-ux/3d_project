import React from 'react'
import { Html, useProgress} from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html>
      <span className='canvas-load'></span>
      <p
        style={{
          fontSize: 14,
          color: '#f1f1f1',
          fontWeight: 800,
          marginTop: 40
        }}
      >{progress.toFixed(2)}%</p> {/* 小数点后保留两位小数，toFixed返回的是一个字符串 */}
    </Html>
  )
}

export default Loader