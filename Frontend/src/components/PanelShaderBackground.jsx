import { memo, Suspense } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const PanelShaderBackground = memo(function PanelShaderBackground({ 
  variant = 'default',
  opacity = 0.4,
  className = ''
}) {
  const getShaderConfig = (variant) => {
    const configs = {
      about: {
        color1: "#016B61",
        color2: "#004e00", 
        color3: "#7a7a39",
        cAzimuthAngle: 180,
        cPolarAngle: 80,
        positionX: -0.3,
        positionY: 0.2,
        positionZ: -0.3,
        rotationX: 50,
        rotationY: 10,
        uSpeed: 0.15,
        uStrength: 3,
        uDensity: 1.2
      },
      threats: {
        color1: "#2dd68f",
        color2: "#016B61",
        color3: "#004e00",
        cAzimuthAngle: 200,
        cPolarAngle: 60,
        positionX: 0.2,
        positionY: -0.1,
        positionZ: -0.4,
        rotationX: 35,
        rotationY: -15,
        uSpeed: 0.25,
        uStrength: 5,
        uDensity: 1.8
      },
      domains: {
        color1: "#02a89a",
        color2: "#2dd68f",
        color3: "#016B61",
        cAzimuthAngle: 150,
        cPolarAngle: 75,
        positionX: 0.1,
        positionY: 0.3,
        positionZ: -0.2,
        rotationX: 40,
        rotationY: 5,
        uSpeed: 0.18,
        uStrength: 4,
        uDensity: 1.4
      },
      features: {
        color1: "#004e00",
        color2: "#02a89a",
        color3: "#9a9a59",
        cAzimuthAngle: 160,
        cPolarAngle: 65,
        positionX: -0.1,
        positionY: -0.2,
        positionZ: -0.5,
        rotationX: 55,
        rotationY: -10,
        uSpeed: 0.12,
        uStrength: 3.5,
        uDensity: 1.1
      }
    };
    
    // Default config (similar to hero section but with variations)
    const defaultConfig = {
      color1: "#006200",
      color2: "#004e00",
      color3: "#9a9a59",
      cAzimuthAngle: 170,
      cPolarAngle: 70,
      positionX: 0,
      positionY: 0.5,
      positionZ: -0.5,
      rotationX: 45,
      rotationY: 0,
      uSpeed: 0.2,
      uStrength: 4,
      uDensity: 1.5
    };
    
    return configs[variant] || defaultConfig;
  };

  const config = getShaderConfig(variant);

  return (
    <div 
      className={`panel-shader-background ${className}`}
      style={{ opacity }}
    >
      <Suspense fallback={<div />}>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
          }}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1}
            cAzimuthAngle={config.cAzimuthAngle}
            cDistance={4.4}
            cPolarAngle={config.cPolarAngle}
            cameraZoom={1.2}
            color1={config.color1}
            color2={config.color2}
            color3={config.color3}
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={50}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={config.positionX}
            positionY={config.positionY}
            positionZ={config.positionZ}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={config.rotationX}
            rotationY={config.rotationY}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={config.uDensity}
            uFrequency={0}
            uSpeed={config.uSpeed}
            uStrength={config.uStrength}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
});

export default PanelShaderBackground;