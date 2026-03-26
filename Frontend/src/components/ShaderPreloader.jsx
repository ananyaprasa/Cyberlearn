import { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

// Preload shader components to reduce initial loading time
const ShaderPreloader = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    // Preload the shader components
    const preloadTimer = setTimeout(() => {
      setIsPreloaded(true);
    }, 100);

    return () => clearTimeout(preloadTimer);
  }, []);

  if (!isPreloaded) {
    return null;
  }

  return (
    <div style={{ display: 'none' }}>
      <ShaderGradientCanvas style={{ width: 1, height: 1 }}>
        <ShaderGradient />
      </ShaderGradientCanvas>
    </div>
  );
};

export default ShaderPreloader;