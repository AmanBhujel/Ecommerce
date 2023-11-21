'use client'
import React, { useState } from 'react'
import '../styles/EditSidebarText.css';
import { useTextContext } from '../../ContextEditing/TextContext';

const EditSidebarText = () => {
  const {  setAddPreDesignedText, setPreDesignedText, fontWeight, setFontWeight, shadowOffsetX, setShadowOffsetX, shadowOffsetY, setShadowOffsetY, text, setText, setAddText, showTextOutlines, outlineWidth, setOutlineWidth, outlineColor, setOutlineColor, shadowColor, setShadowColor, shadowBlur, setShadowBlur } = useTextContext();
  const addTextInCanvas = () => {
    if (text) {
      setAddText(true);
    }
  };
  const drawTextWithProperties = (textObject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 180;
    canvas.height = 60;

    // Set font properties
    ctx.font = `15px Arial`; // You can customize the font here
    ctx.fillStyle = textObject.color;
    ctx.strokeStyle = textObject.stroke;
    ctx.lineWidth = textObject.strokeWidth;
    ctx.shadowColor = textObject.shadowColor;
    ctx.shadowBlur = textObject.shadowBlur;
    ctx.shadowOffsetX = textObject.shadowOffsetX;
    ctx.shadowOffsetY = textObject.shadowOffsetY;

    // Draw text
    ctx.fillText(textObject.text, 10, 30);
    ctx.strokeText(textObject.text, 10, 30);

    return canvas.toDataURL(); // Convert canvas to data URL
  };
  const textData = [
    {
      text: "Faith in every step.",
      stroke: "blue",
      strokeWidth: 1,
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowBlur: 2,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      color: "red",
      fontWeight: 900, 
    },
    {
      text: "Blessed and grateful.",
      stroke: "green",
      strokeWidth: 1,
      shadowColor: "rgba(128, 128, 0, 0.5)",
      shadowBlur: 2,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      color: "purple",
      fontWeight: 600, 

    },
    {
      text: "Trust the journey.",
      stroke: "orange",
      strokeWidth: 1,
      shadowColor: "rgba(255, 165, 0, 0.5)",
      shadowBlur: 2,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      color: "blue",
      fontWeight: 600, 

    },
    {
      text: "Train Hard!.",
      stroke: "blue",
      strokeWidth: 1,
      fontWeight: 600, 
      shadowColor: "rgba(0, 0, 128, 0.5)",
      shadowBlur: 6,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      color: "red",
    },
    {
      text: "BELIEVE IN YOURSELF.",
      stroke: "red",
      strokeWidth: 1,
      shadowColor: "rgba(255, 255, 0, 0.5)",
      shadowBlur: 1,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      color: "green",
      fontWeight: 600, 

    },
    {
      text: "Embrace the wild.",
      stroke: "green",
      strokeWidth: 1,
      shadowColor: "rgba(0, 128, 0, 0.5)",
      shadowBlur: 2,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      color: "blue",
      fontWeight: 600, 

    },
  ];

  console.log(textData);

  const handleAddingPredesignedText = (textData) => {
    setAddPreDesignedText(true);
    setPreDesignedText(textData)
  }
  const selectPreDesignedText = (selectedText) => {
    setFontWeight(selectedText.fontWeight);
    setOutlineWidth(selectedText.strokeWidth);
    setOutlineColor(selectedText.stroke);
    setShadowColor(selectedText.shadowColor);
    setShadowBlur(selectedText.shadowBlur);
    setShadowOffsetX(selectedText.shadowOffsetX);
    setShadowOffsetY(selectedText.shadowOffsetY);
  };

  // Handle the onChange event of the slider
  const handleFontWeightChange = (event) => {
    const newFontWeight = event.target.value;
    setFontWeight(newFontWeight);
    console.log(newFontWeight)
  };
  return (
    <>
      <div className='inputInSidebarText'>
        <input placeholder='Enter your text..' value={text} type='text' onChange={(e) => setText(e.target.value)} />
        <button onClick={addTextInCanvas}>Add</button>
      </div>
      {
        showTextOutlines ?
          <div>
            <label>
              Outline Color:
              <input
                type="color"
                value={outlineColor}
                onChange={(e) => setOutlineColor(e.target.value)}
              />
            </label>
            <label>
              Outline Width:
              <input
                type="range"
                value={outlineWidth}
                min={0}
                max={10} // Adjust the max value according to your requirements
                onChange={(e) => setOutlineWidth(parseInt(e.target.value))}
              />
              {outlineWidth}
            </label>
            <label>
              Shadow Color:
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
              />
            </label>
            <label>
              Shadow Blur:
              <input
                type="range"
                value={shadowBlur}
                min={0}
                max={10} // Adjust the max value according to your requirements
                onChange={(e) => setShadowBlur(parseInt(e.target.value))}
              />
              {shadowBlur}
            </label>
            <label htmlFor="shadowOffsetX">Shadow Offset X:</label>
            <input
              type="range"
              id="shadowOffsetX"
              min="-10"
              max="10"
              step="1"
              value={shadowOffsetX}
              onChange={(e) => setShadowOffsetX(Number(e.target.value))}
            />

            <label htmlFor="shadowOffsetY">Shadow Offset Y:</label>
            <input
              type="range"
              id="shadowOffsetY"
              min="-10"
              max="10"
              step="1"
              value={shadowOffsetY}
              onChange={(e) => setShadowOffsetY(Number(e.target.value))}
            />
            <label htmlFor="fontWeightSlider">Font Weight:</label>
            <input
              type="range"
              id="fontWeightSlider"
              min="100"
              max="1000"
              step={100}
              value={fontWeight}
              onChange={handleFontWeightChange}
            />
            <span>{fontWeight}</span>

          </div> :
          <div className='preDesignedTextsInSidebar'>
            {textData.map((textObject, index) => (
              <div className='designedTextContainer' key={index}>
                <div className='designedTextImage' >
                  <img src={drawTextWithProperties(textObject)} alt={textObject.text} />
                </div>
                <div className='designedTextButton'>
                  <button
                    onClick={() => {
                      selectPreDesignedText(textObject);
                      handleAddingPredesignedText(textObject);
                    }
                    }>Add</button>
                </div>
              </div>
            ))}
          </div>
      }
    </>
  )
}

export default EditSidebarText;