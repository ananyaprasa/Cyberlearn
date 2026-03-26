import { memo } from 'react';

const StaticShaderBackground = memo(function StaticShaderBackground() {
  return (
    <div className="static-shader-background">
      {/* Enhanced CSS Water-like Effect */}
      <div className="water-wave-layer"></div>
      <div className="gradient-layer-1"></div>
      <div className="gradient-layer-2"></div>
      <div className="gradient-layer-3"></div>
    </div>
  );
});

export default StaticShaderBackground;