// TreeView.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.scss';

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [contextMenuActions, setContextMenuActions] = useState([]);

  useEffect(() => {
    // Load tree data from JSON file
    fetch('/treeData.json')
      .then((response) => response.json())
      .then((data) => setTreeData(data));

    // Load context menu actions from JSON file
    fetch('/contextMenuActions.json')
      .then((response) => response.json())
      .then((data) => setContextMenuActions(data));
  }, []);

  const TreeNodeComponent = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleRightClick = (e) => {
      e.preventDefault();
      if (!node.children && contextMenuActions.length >= 1 ) {
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        console.log(`Right-clicked on leaf node ${node.label}`);
      }
    };

    const closeContextMenu = () => {
      setContextMenuPosition({ top: 0, left: 0 });
    };

    return (
      <div className="tree-node" onMouseLeave={closeContextMenu}>
        <div className="node-label" onClick={handleToggle} onContextMenu={handleRightClick}>
        {node.children && <span className={`toggle-icon ${isOpen ? 'open' : 'closed'}`}></span>}
          {node.label}
        </div>
        {isOpen && node.children && (
          <div className="node-children">
            {node.children.map((child) => (
              <TreeNodeComponent key={child.id} node={child} />
            ))}
          </div>
        )}
        {contextMenuPosition.top !== 0 && contextMenuPosition.left !== 0 && (
          <ContextMenu position={contextMenuPosition} actions={contextMenuActions} />
        )}
      </div>
    );
  };

  const ContextMenu = ({ position, actions }) => {
    return (
      <div className="context-menu" style={{ top: position.top, left: position.left }}>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    );
  };

  if (!treeData.length) {
    // Data is still loading, you can render a loading indicator or return null
    return null;
  }

  return (
    <div className="tree-view">
      {treeData.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
