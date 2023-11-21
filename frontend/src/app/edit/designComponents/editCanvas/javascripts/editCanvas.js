'use client'
import React, { useEffect, useRef, useState } from 'react';
import '../styles/EditCanvas.css';
import 'fabric';
import TextEditor from './textEditor';
import { MdOutlineVerticalAlignCenter } from 'react-icons/md';
import { AiFillDelete, AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineVerticalAlignBottom, AiOutlineVerticalAlignTop } from 'react-icons/ai';
import { PiGridFourThin } from 'react-icons/pi';
import { useTextContext } from '../../ContextEditing/TextContext';
import { useImageContext } from '../../ContextEditing/ImageContext';
import { useCanvasContext } from '../../ContextEditing/CanvasContext';
import axios from 'axios';

const EditCanvas = ({ images }) => {
  // State and Refs and Contexts
  const [fabricInitialized, setFabricInitialized] = useState(false);
  const fabricRef = useRef(null);
  const canvasRef = useRef(null);
  const { addPreDesignedText, setAddPreDesignedText, preDesignedText, setPreDesignedText, fontWeight, setFontWeight, shadowOffsetX, setShadowOffsetX, shadowOffsetY, setShadowOffsetY, textSpacing, setTextSpacing, text, setText, addText, setAddText, fontSize, setFontSize, fontFamily, setFontFamily, showTextEditor, setShowTextEditor, fontColor, setFontColor, outlineWidth, setOutlineWidth, outlineColor, setOutlineColor, shadowColor, setShadowColor, shadowBlur, setShadowBlur } = useTextContext();
  const { image, addImage, setImage, setAddImage } = useImageContext();
  const { showGrid, setShowGrid, objectsInCanvas, setObjectsInCanvas, } = useCanvasContext();
  const [canvasURL, setCanvasURL] = useState('')

  // Prevent context menu on canvas
  const handleCanvasContextMenu = (e) => {
    e.preventDefault();
  };

  let windowContent = '<!DOCTYPE html><html><head><title>Canvas Image</title></head><body>';
  // Function to export the canvas as an image
  const exportCanvasImage = async () => {
    if (fabricInitialized) {
      // Create a temporary canvas to render the content at a larger size
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      // Calculate the new dimensions
      const newWidth = fabricRef.current.width;
      const newHeight = fabricRef.current.height;

      // Set the dimensions for the temporary canvas
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      fabricRef.current.renderAll();
      fabricRef.current.setDimensions({ width: newWidth, height: newHeight });
      fabricRef.current.renderAll();
      const dataURL = await fabricRef.current.toDataURL();
      // Restore the original canvas dimensions
      fabricRef.current.setDimensions({ width: 210, height: 230 });
      renderCanvas();
      console.log('data', dataURL)
      await axios.post('https://backend-ecommerce-60yd.onrender.com/store-fabric-objects',
        { fabricURL: dataURL }
      )
        .then(function (response) {
          console.log(response.message);
        })
        .catch(function (error) {
          console.log(error)
        });
      // Append the image to the windowContent
      windowContent += '<img src="' + dataURL + '">';

      // Close the HTML content
      windowContent += '</body></html>';

      // Open the image in a new window or do whatever you want with it
      const printWin = window.open('', '', 'width=' + newWidth + ',height=' + newHeight);
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
    }
  };

  // Render objects on the canvas
  const renderCanvas = (updatedObjectsInCanvas) => {
    if (fabricInitialized) {
      fabricRef.current.clear();
      const objectsToRender = updatedObjectsInCanvas || objectsInCanvas;
      console.log('objects to render', objectsToRender);
      objectsToRender.forEach((object, index) => {
        console.log(`rendering ${index}`, object);
        if (object.type === 'textbox') {
          fabricRef.current.add(object);
        } else if (object.type === 'image') {
          fabricRef.current.add(object);
        }
      });
      fabricRef.current.renderAll();
    }
    else {
      console.log('fabric is not initialized yet.');
    }
  };

  //Add Image in Canvas
  const addImageInCanvas = () => {
    if (addImage) {
      if (image) {
        fabric.Image.fromURL(image, (img) => {
          const maxWidth = 200;
          const maxHeight = 200;

          const originalWidth = img.width;
          const originalHeight = img.height;

          let newWidth, newHeight;
          if (originalWidth > originalHeight) {
            newWidth = maxWidth;
            newHeight = (originalHeight / originalWidth) * maxWidth;
          } else {
            newHeight = maxHeight;
            newWidth = (originalWidth / originalHeight) * maxHeight;
          }

          const fabricImage = img.set({
            left: 100,
            top: 100,
            scaleX: newWidth / originalWidth,
            scaleY: newHeight / originalHeight,
            selectable: true,
            hasControls: true,
            hoverCursor: 'pointer',
          });
          console.log('image is created', fabricImage)
          fabricRef.current.add(fabricImage);
          setAddImage(false);
          setImage('')
          setObjectAndRender(fabricImage);
        });
      }
    }
  };

  // updating objects and rendering
  const setObjectAndRender = (object) => {
    if (object) {
      const updatedObjectsInCanvas = [...objectsInCanvas, object];
      setObjectsInCanvas(updatedObjectsInCanvas);
      console.log('from add image', updatedObjectsInCanvas);
      renderCanvas(updatedObjectsInCanvas);
    }
    else {
      renderCanvas();
    }
  }

  //sending data to backend
  const sendDataToBackend = () => {

  }
  // Handle delete object
  const handleDeleteObject = () => {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      fabricRef.current.remove(activeObject);
      const newObjectsInCanvas = objectsInCanvas.filter((obj) => obj !== activeObject);
      setObjectsInCanvas(newObjectsInCanvas);
    }
  };

  // Handle text alignment for selected textbox
  const handleTextAlignment = (alignment) => {
    const activeObject = fabricRef.current.getActiveObject();
    const textWidth = fabricRef.current.getWidth();
    if (activeObject && activeObject.type === 'textbox') {
      const canvasWidth = fabricRef.current.width;
      const textWidth = activeObject.getScaledWidth();
      const textHeight = activeObject.getScaledHeight();
      console.log('text', textWidth)

      if (alignment === 'left') {
        activeObject.set({ left: 0 });
        activeObject.set({ textAlign: 'left' });
      } else if (alignment === 'center') {
        activeObject.set({ left: (canvasWidth - textWidth) / 2 });
      } else if (alignment === 'right') {
        activeObject.set({ left: canvasWidth - textWidth });
      } else if (alignment === 'top') {
        activeObject.set({ top: 0 })
      } else if (alignment === 'bottom') {
        const canvasHeight = fabricRef.current.height;
        activeObject.set({ top: canvasHeight - textHeight })
      } else if (alignment = 'vertical-center') {
        const canvasHeight = fabricRef.current.height;
        activeObject.set({
          top: (canvasHeight - textHeight) / 2
        })
      }
      fabricRef.current.renderAll();
    }
  };

  // // Create perpendicular lines on the canvas
  // const createPerpendicularLines = () => {
  //   if (showGrid) {
  //     const canvasCenterX = fabricRef.current.width / 2;
  //     const canvasCenterY = fabricRef.current.height / 2;
  //     const horizontalLine = new fabric.Line(
  //       [0, canvasCenterY, fabricRef.current.width, canvasCenterY],
  //       {
  //         fill: 'black',
  //         stroke: 'black',
  //         strokeWidth: 1,
  //         strokeDashArray: [3, 3],
  //         selectable: false,
  //         hoverCursor: 'default',
  //       }
  //     );
  //     const verticalLine = new fabric.Line(
  //       [canvasCenterX, 0, canvasCenterX, fabricRef.current.height],
  //       {
  //         stroke: 'black',
  //         strokeWidth: 1,
  //         strokeDashArray: [3, 3],
  //         selectable: false,
  //         hoverCursor: 'default',
  //       }
  //     );
  //     fabricRef.current.add(horizontalLine, verticalLine);
  //     fabricRef.current.renderAll();
  //   }
  // };

  //get stored fabric data 
  const getStoredFabricData = async () => {
    await axios.get('https://backend-ecommerce-60yd.onrender.com/get-fabric-objects')
      .then(response => {

        setObjectAndRender(JSON.parse(response.data));
        // Use the fabricObjects data as needed in your frontend
        console.log('Retrieved fabric objects:', JSON.parse(response.data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    renderCanvas();
  }

  // Handle scaling of the active object
  const handleScaling = () => {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      const scaleFactorX = activeObject.scaleX;
      const scaleFactorY = activeObject.scaleY;

      const originalFontSize = activeObject.fontSize;
      const newFontSizeY = originalFontSize * scaleFactorY;
      const correspondingScaleFactorX = scaleFactorX * (newFontSizeY / originalFontSize);

      const newFontSizeX = originalFontSize * correspondingScaleFactorX;
      const newFontSize = (newFontSizeX + newFontSizeY) / 2;
      const newWidth = activeObject.text.length * newFontSize / 2;
      const roundedFontSize = Math.floor(newFontSize);

      activeObject.set({
        fontSize: roundedFontSize,
        scaleX: correspondingScaleFactorX,
        scaleY: scaleFactorY,
        width: newWidth,
      });
      setFontSize(roundedFontSize);
    }

  };

  // Handle text styling for selected textbox
  const handleTextStyling = () => {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({
        fontFamily: fontFamily,
        fontSize: fontSize,
        fill: fontColor,
        stroke: outlineColor,
        strokeWidth: outlineWidth,
        fontWeight: fontWeight,
        shadow: {
          color: shadowColor,
          blur: shadowBlur,
          offsetX: shadowOffsetX,
          offsetY: shadowOffsetY,
        },
      });
      fabricRef.current.renderAll();
    }
  };

  //Toggle Canvas Grid 
  const handleGridToggle = () => {
    setShowGrid(!showGrid)
  }

  // Handle object selection
  const handleObjectSelection = () => {
    const activeObject = fabricRef.current.getActiveObject();

    if (activeObject && activeObject.type === 'textbox') {
      console.log('active', activeObject)
      const activeFontSize = activeObject.get('fontSize');
      const activeFontFamily = activeObject.get('fontFamily');
      const activeOutlineColor = activeObject.get('stroke');
      const activeOutlineWidth = activeObject.get('strokeWidth');
      const activeFontColor = activeObject.get('fill');
      const activeShadow = activeObject.get('shadow');
      const activeShadowColor = activeShadow ? activeShadow.color : 'transparent';
      const activeShadowBlur = activeShadow ? activeShadow.blur : 0;
      const activeFontWeight = activeObject.get('fontWeight');
      setFontWeight(activeFontWeight);
      setShadowColor(activeShadowColor);
      setOutlineColor(activeOutlineColor);
      setShadowBlur(activeShadowBlur);
      setOutlineWidth(activeOutlineWidth);
      setFontSize(activeFontSize);
      setFontFamily(activeFontFamily);
      setFontColor(activeFontColor);
      setShowTextEditor(true);
      fabricRef.current.renderAll();
    }
    else {
      setShowTextEditor(false);
      console.log(activeObject);
      console.log('from selection', objectsInCanvas)
    }
  };

  //Initializing the Fabric Canvas
  const initFabric = () => {
    const imgElement = document.querySelector('.editCanvasImageSection img');

    if (!imgElement.complete) {
      imgElement.onload = () => {
        initFabric();
      };
    } else {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }

      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        width: 210,
        height: 230,
        selection: false,
      });

      if (fabricRef.current) {
        fabricRef.current.on('selection:created', handleObjectSelection);
        fabricRef.current.on('object:scaling', handleScaling);
        getStoredFabricData();
      }
      console.log(objectsInCanvas, 'init');
      setFabricInitialized(true);

      renderCanvas();

    }
  };

  // Add text in canvas
  const addTextInCanvas = () => {
    if (addText && text.trim() !== '') {
      const textbox = new fabric.Textbox(text, {
        left: 100,
        top: 90,
        fontFamily: 'Arial',
        fontSize: 30,
        fill: 'black',
        stroke: 'transparent', // Set the outline color
        strokeWidth: 1, // Set the outline width
        perPixelTargetFind: true,
        cornerSize: 10,
        shadow: {
          color: 'black', // Set the shadow color
          blur: 1, // Set the shadow blur
          offsetX: 1, // Set the shadow offsetX
          offsetY: 1, // Set the shadow offsetY
        },
        zIndex: 1,
        hasControls: true,
        selectable: true,
        fontWeight: 500,
        hoverCursor: 'pointer', // Set the cursor to 'pointer' when hovering
        textAlign: 'left'
      });


      // Disable all controls except the corner controls
      textbox.setControlsVisibility({
        mtr: false,
        mbr: false,
        mml: false,
        mmr: false,
        mt: false,
        mb: false,
        // ml: false,
        // mr: false,
      });
      fabricRef.current.add(textbox);
      axios.post('https://backend-ecommerce-60yd.onrender.com/store-fabric-objects', textbox)
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      setObjectAndRender(textbox);
      setAddText(false);
      setText('');
    }
  };
  const handleAddingPreDesignedText = () => {
    if (addPreDesignedText) {
      const textObject = preDesignedText;
      const textbox = new fabric.Textbox(textObject.text, {
        left: 60,
        top: 70,
        fontFamily: 'Arial',
        fontSize: 18,
        fill: textObject.color,
        stroke: textObject.stroke, // Set the outline color
        strokeWidth: textObject.strokeWidth, // Set the outline width
        perPixelTargetFind: true,
        cornerSize: 10,
        shadow: {
          color: textObject.shadowColor, // Set the shadow color
          blur: textObject.shadowBlur, // Set the shadow blur
          offsetX: textObject.shadowOffsetX, // Set the shadow offsetX
          offsetY: textObject.shadowOffsetY, // Set the shadow offsetY
        },
        zIndex: 1,
        hasControls: true,
        selectable: true,
        fontWeight: textObject.fontWeight,
        hoverCursor: 'pointer', // Set the cursor to 'pointer' when hovering
        autoWidth: true, // Set autoWidth to true to adjust width based on text
      });


      // Disable all controls except the corner controls
      textbox.setControlsVisibility({
        mtr: true,
        mbr: true,
        mml: true,
        mmr: true,
        mt: false,
        mb: false,
        ml: true,
        mr: true,
      });
      fabricRef.current.add(textbox);
      setObjectAndRender(textbox);
      setAddPreDesignedText(false);
      setPreDesignedText('');
    }
  };

  useEffect(() => {
    initFabric();

    window.addEventListener('resize', initFabric);
    return () => {
      window.removeEventListener('resize', initFabric);
    };
  }, [showGrid]);
  useEffect(() => {
    if (fabricInitialized) {
      addTextInCanvas();
      addImageInCanvas();

    }
  }, [addImage, addText]);
  useEffect(() => {
    renderCanvas();
  }, [fabricInitialized, objectsInCanvas]);
  useEffect(() => {
    if (fabricInitialized) {
      handleTextStyling();
    }
  }, [fontWeight, fontSize, fontFamily, fontColor, shadowBlur, shadowColor, outlineColor, outlineWidth, shadowOffsetX, shadowOffsetY]);
  useEffect(() => {
    console.log(preDesignedText);
    handleAddingPreDesignedText();
  }, [addPreDesignedText])
  return (
    <>
      <div className='editCanvasMain'>
        <section className='editCanvasButtonSection'>
          <div>
            <button onClick={handleDeleteObject} data-tooltip="Delete"><AiFillDelete /></button>
            <button onClick={handleGridToggle} data-tooltip="Toggle Grid"><PiGridFourThin /></button>
            <button onClick={exportCanvasImage} data-tooltip="Export"><span>E</span></button>
          </div>

          {showTextEditor ?
            <div>
              <button onClick={() => handleTextAlignment('left')}><AiOutlineAlignLeft /></button>
              <button onClick={() => handleTextAlignment('center')}><AiOutlineAlignCenter /></button>
              <button onClick={() => handleTextAlignment('right')}><AiOutlineAlignRight /></button>
              <button onClick={() => handleTextAlignment('top')}><AiOutlineVerticalAlignTop /></button>
              <button onClick={() => handleTextAlignment('bottom')}><AiOutlineVerticalAlignBottom /></button>
              <button onClick={() => handleTextAlignment('vertical-center')}><MdOutlineVerticalAlignCenter /></button>
              <TextEditor />
            </div> : ''}

        </section>
        <section className='editCanvasEditingSection'>
          <div className='editCanvasImageSection'>
            <img
              src={'/editHoodie.png'}
              onContextMenu={handleCanvasContextMenu}
              alt='Hoodie'
            />
            <div className='canvasContainer'>
              <canvas
                ref={canvasRef}
                className={`canvasContainerCanvas ${showGrid ? 'showGrid' : ''}`}
                onContextMenu={handleCanvasContextMenu}
              />
            </div>
          </div>
        </section>
        <button onClick={sendDataToBackend}>send data to backend</button>
      </div>
    </>
  );
};

export default EditCanvas;