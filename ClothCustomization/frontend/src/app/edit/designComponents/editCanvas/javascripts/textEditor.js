'use client'
import React, { useState } from 'react';
import { useTextContext } from '../../ContextEditing/TextContext';

const TextEditor = () => {
    const { fontSize, setFontSize, fontFamily, setFontFamily ,changeText,setChangeText,fontColor,setFontColor,showTextOutlines,setShowTextOutlines }= useTextContext();
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamily = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };
  const handleOutline=()=>{
    setShowTextOutlines(true)
  }

  return (
    <div>
      <label>
        Font Size:
        <input
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          min={1}
          max={100}
          step={5}
        />
      </label>


      <select value={fontFamily} onChange={handleFontFamily}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Impact">Impact</option>
      </select>


      <label>
        Font Color:
        <input
          type="color"
          value={fontColor}
          onChange={handleFontColorChange}
        />
      </label>
      <button onClick={handleOutline}>Outline</button>
    </div>
  );
};

export default TextEditor;
