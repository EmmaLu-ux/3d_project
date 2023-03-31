import React, { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, useGizmoContext } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('../../../public/desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black'/>
      <pointLight intensity={1}/>
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive object={computer.scene} scale={isMobile ? 0.7 : 0.75} position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]}/>
    </mesh>
  )
}

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    // 为屏幕大小的变化添加一个监听器
    const mediaQuery = window.matchMedia('(max-width: 500px)')
    // 设置isMobile的初始值
    setIsMobile(mediaQuery.matches)
    // 定义一个回调函数来处理媒体查询的改变
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }
    // 为媒体查询的改变添加回调函数作为一个监听器
    mediaQuery.addEventListener('change', handleMediaQueryChange)
    // 组件卸载的时候移除监听器
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])
  
  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      /* 表示在绘制三维场景时，保留绘制缓冲区中的内容。这个绘制缓冲区是WebGL渲染器用于存储绘制三维场景后的结果的内存区域。 */
      gl={{ preserveDrawingBuffer: true }} /* gl:WebGL渲染上下文对象。 */
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls /* 允许用户通过鼠标或触摸屏幕来旋转、缩放和平移场景中的对象 */
          enableZoom={false} /* 是否启用缩放，默认为true。 */
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
          
      <Preload all />
    </Canvas>
  )
}

export default ComputerCanvas