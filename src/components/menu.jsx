// TreeView.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.scss';

const TreeView = () => {
  const sampleData = [
    {
      id: '1',
      label: 'Node 1',
      children: [
        {
          id: '2',
          label: 'Node 1.1',
          children: [
            {
              id: '3',
              label: 'Node 1.1.1',
            },
            {
              id: '4',
              label: 'Node 1.1.2',
            },
          ],
        },
        {
          id: '5',
          label: 'Node 1.2',
        },
      ],
    },
    {
      id: '6',
      label: 'Node 2',
      children: [
        {
          id: '7',
          label: 'Node 2.1',
        },
        {
          id: '8',
          label: 'Node 2.2',
        },
      ],
    },
  ];

  const TreeNodeComponent = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleRightClick = (e) => {
      e.preventDefault();
      if (!node.children || node.children.length === 0) {
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
          <ContextMenu position={contextMenuPosition} />
        )}
      </div>
    );
  };

  const ContextMenu = ({ position }) => {
    return (
      <div className="context-menu" style={{ top: position.top, left: position.left }}>
        <ul>
          <li>Action 1</li>
          <li>Action 2</li>
          <li>Action 3</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="tree-view">
      {sampleData.map((node) => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
