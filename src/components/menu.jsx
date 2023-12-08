// TreeView.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.scss';

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [contextMenuActions, setContextMenuActions] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);

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
    const handleClick = () => {
      handleToggle();
      if (!node.children) 
      {
        setHighlightedNode(node.id);
      }
      
      }

    const handleRightClick = (e) => {
      e.preventDefault();
      if (!node.children) 
      {
        setHighlightedNode(node.id);
      }
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
        <div className="node-label" onClick={handleClick} onContextMenu={handleRightClick}>
        <span className={`highlight-region ${highlightedNode === node.id ? 'highlighted' : ''}`}>
        {node.children && !isOpen &&(
        <>
          <img
            className="folder-icon"
            src="/abb_down_16.png" // Replace with the actual path to your folder icon
          />
         <img
            className="folder-icon"
            src="/abb_folder_16.svg" // Replace with the actual path to your folder icon
          />
        </>
        )}
        {node.children && isOpen &&(
          <>
          <img
            className="folder-icon"
            src="/abb_right_16.png" 
            style={{ marginRight: '8px' }}// Replace with the actual path to your folder icon
          />
          <img
            className="folder-icon"
            src="/abb_folder-open_16.svg" // Replace with the actual path to your folder icon
          />
          </>
        )}
        {!node.children &&(
          <img
            className="folder-icon"
            src="/abb_document-pdf_16.png" 
          />
        )}
        <span className='label'>{node.label}</span></span>
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
