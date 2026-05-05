import React from 'react';
import './PageLayout.css'; // optional: small layout-specific overrides

// children: the main content rendered in the page
export default function PageLayout({ children, sidebar = null, className = '' }) {
  return (
    <div className={`page-layout ${className}`.trim()}>
      {sidebar}
      <div className="page-main">
        {children}
      </div>
    </div>
  );
}