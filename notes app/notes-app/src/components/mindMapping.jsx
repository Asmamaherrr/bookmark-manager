"use client"

import { useState, useRef, useEffect } from 'react'

const MindMap = ({ onClose, onSave, initialData = null }) => {
  const [nodes, setNodes] = useState(initialData?.nodes || [])
  const [connections, setConnections] = useState(initialData?.connections || [])
  const [selectedNode, setSelectedNode] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const [editingNode, setEditingNode] = useState(null)
  const [editText, setEditText] = useState('')

  // Initialize with a central node if empty
  useEffect(() => {
    if (nodes.length === 0) {
      const centerNode = {
        id: '1',
        text: 'Central Idea',
        x: 400,
        y: 300,
        width: 140,
        height: 60,
        color: '#3b82f6'
      }
      setNodes([centerNode])
    }
  }, [])

  // Handle drawing on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from)
      const toNode = nodes.find(n => n.id === conn.to)
      
      if (fromNode && toNode) {
        ctx.beginPath()
        ctx.moveTo(fromNode.x + fromNode.width/2, fromNode.y + fromNode.height/2)
        ctx.lineTo(toNode.x + toNode.width/2, toNode.y + toNode.height/2)
        ctx.strokeStyle = '#94a3b8'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })
    
    // Draw nodes
    nodes.forEach(node => {
      // Draw node background
      ctx.fillStyle = node.color
      ctx.fillRect(node.x, node.y, node.width, node.height)
      
      // Draw node border
      ctx.strokeStyle = selectedNode === node.id ? '#f59e0b' : '#1e293b'
      ctx.lineWidth = selectedNode === node.id ? 3 : 2
      ctx.strokeRect(node.x, node.y, node.width, node.height)
      
      // Draw node text
      ctx.fillStyle = '#000000'
      ctx.font = '14px system-ui'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Split text into multiple lines if needed
      const words = node.text.split(' ')
      const lines = []
      let currentLine = words[0]
      
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i]
        const metrics = ctx.measureText(testLine)
        if (metrics.width > node.width - 20) {
          lines.push(currentLine)
          currentLine = words[i]
        } else {
          currentLine = testLine
        }
      }
      lines.push(currentLine)
      
      // Draw each line of text
      lines.forEach((line, i) => {
        ctx.fillText(
          line, 
          node.x + node.width/2, 
          node.y + node.height/2 - ((lines.length - 1) * 8) + (i * 16)
        )
      })
    })
  }, [nodes, connections, selectedNode])

  const addNode = () => {
    if (!selectedNode) return
    
    const parentNode = nodes.find(n => n.id === selectedNode)
    if (!parentNode) return
    
    const newId = Date.now().toString()
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
    
    const newNode = {
      id: newId,
      text: 'New Idea',
      x: parentNode.x + (Math.random() > 0.5 ? 200 : -200),
      y: parentNode.y + (Math.random() > 0.5 ? 120 : -120),
      width: 120,
      height: 50,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    
    setNodes([...nodes, newNode])
    setConnections([...connections, { from: selectedNode, to: newId }])
  }

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if clicked on a node
    const clickedNode = nodes.find(node => 
      x >= node.x && x <= node.x + node.width &&
      y >= node.y && y <= node.y + node.height
    )
    
    if (clickedNode) {
      setSelectedNode(clickedNode.id)
      setEditingNode(null)
    } else {
      setSelectedNode(null)
      setEditingNode(null)
    }
  }

  const handleCanvasDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if double-clicked on a node
    const clickedNode = nodes.find(node => 
      x >= node.x && x <= node.x + node.width &&
      y >= node.y && y <= node.y + node.height
    )
    
    if (clickedNode) {
      setEditingNode(clickedNode.id)
      setEditText(clickedNode.text)
    }
  }

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const clickedNode = nodes.find(node => 
      x >= node.x && x <= node.x + node.width &&
      y >= node.y && y <= node.y + node.height
    )
    
    if (clickedNode) {
      setIsDragging(true)
      setSelectedNode(clickedNode.id)
      setDragOffset({
        x: x - clickedNode.x,
        y: y - clickedNode.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedNode) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setNodes(nodes.map(node => 
      node.id === selectedNode 
        ? { ...node, x: x - dragOffset.x, y: y - dragOffset.y }
        : node
    ))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const deleteNode = () => {
    if (!selectedNode) return
    
    // Don't delete the central node if it's the only one
    if (selectedNode === '1' && nodes.length === 1) return
    
    setNodes(nodes.filter(node => node.id !== selectedNode))
    setConnections(connections.filter(
      conn => conn.from !== selectedNode && conn.to !== selectedNode
    ))
    setSelectedNode(null)
  }

  const saveEdit = () => {
    if (!editingNode) return
    
    setNodes(nodes.map(node => 
      node.id === editingNode 
        ? { ...node, text: editText }
        : node
    ))
    setEditingNode(null)
  }

  const exportMindMap = () => {
    const data = {
      nodes,
      connections,
      exportedAt: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(data)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'mindmap.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mind Map</h2>
          <div className="flex gap-2">
            <button
              onClick={addNode}
              disabled={!selectedNode}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Add Node
            </button>
            <button
              onClick={deleteNode}
              disabled={!selectedNode}
              className="px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-300"
            >
              Delete Node
            </button>
            <button
              onClick={exportMindMap}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Export
            </button>
            <button
              onClick={() => onSave({ nodes, connections })}
              className="px-3 py-1 bg-purple-500 text-white rounded"
            >
              Save to Notes
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-200 cursor-pointer bg-gray-50"
            onClick={handleCanvasClick}
            onDoubleClick={handleCanvasDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {editingNode && (
            <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg z-10">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border border-gray-300 p-2 rounded w-64"
                placeholder="Node text"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingNode(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
          <p>Double-click a node to edit text • Drag to move nodes • Select a node to add children</p>
        </div>
      </div>
    </div>
  )
}

export default MindMap