import { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const OptimizedBackground = ({ 
  colors = ['#006200', '#004e00', '#9a9a59'],
  type = 'waterPlane',
  animate = 'on',
  ...shaderProps 
}) => {
  const [shaderLoaded, setShaderLoaded] = useState(false);

  // Create a more sophisticated CSS gradient that better matches the shader
  const fallbackGradient = type === 'sphere' 
    ? `radial-gradient(circle at 30% 70%, ${colors[0]} 0%, ${colors[1]} 40%, ${colors[2]} 100%)`
    : `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;

  useEffect(() => {
    // Very short delay to allow immediate visual feedback
    const timer = setTimeout(() => {
      setShaderLoaded(true);
    }, 10); // Reduced to 10ms for even faster loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Immediate static background with better gradient matching */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          background: fallbackGradient,
          opacity: 0.8,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      
      {/* Shader background that fades in smoothly */}
      <ShaderGradientCanvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          opacity: shaderLoaded ? 0.8 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <ShaderGradient
          animate={animate}
          axesHelper="off"
          brightness={shaderProps.brightness || 1}
          cAzimuthAngle={shaderProps.cAzimuthAngle || 170}
          cDistance={shaderProps.cDistance || 4.4}
          cPolarAngle={shaderProps.cPolarAngle || 70}
          cameraZoom={shaderProps.cameraZoom || 1}
          color1={colors[0]}
          color2={colors[1]}
          color3={colors[2]}
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={shaderProps.positionX || 0}
          positionY={shaderProps.positionY || 0}
          positionZ={shaderProps.positionZ || 0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={shaderProps.rotationX || 0}
          rotationY={shaderProps.rotationY || 0}
          rotationZ={shaderProps.rotationZ || 0}
          shader="defaults"
          type={type}
          uAmplitude={shaderProps.uAmplitude || 0}
          uDensity={shaderProps.uDensity || 1.2}
          uFrequency={shaderProps.uFrequency || 0}
          uSpeed={shaderProps.uSpeed || 0.2}
          uStrength={shaderProps.uStrength || 3.4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </>
  );
};

export default OptimizedBackground;