import { memo } from 'react';

const CollapsibleSection = memo(function CollapsibleSection({ title, children, isOpen, onToggle }) {
  return (
    <div className="collapsible-section">
      <button 
        className={`collapsible-header ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
      >
        <span className="collapsible-title">{title}</span>
        <span className="collapsible-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
});

export default CollapsibleSection;
