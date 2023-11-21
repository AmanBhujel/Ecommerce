import React, { useRef } from 'react';
import { useCanvasContext } from '@/app/edit/designComponents/ContextEditing/CanvasContext';
import { AiFillDelete, AiFillUnlock, AiOutlineLock } from 'react-icons/ai';
import '../styles/editSidebarLayer.css';
import axios from 'axios';

const EditSidebarLayers = () => {
  const { objectsInCanvas, setObjectsInCanvas } = useCanvasContext();

  const toggleLockObject = (index) => {
    const updatedObjects = [...objectsInCanvas];
    const objectToToggle = updatedObjects[index];
    objectToToggle.selectable = !objectToToggle.selectable;
    setObjectsInCanvas(updatedObjects);
  };

  const dragLayer = useRef(null);
  const dragOverItem = useRef(null);

  const handleDataBackend = () => {
    const jsonData = JSON.stringify(objectsInCanvas)
    console.log(jsonData, 'jsondata');
    axios.post('http://localhost:5000/storeCanvasImage', {
      fabricObjects: objectsInCanvas
    })
      .then(function (response) {
        console.log(response.mmessage);
      })
      .catch(function (error) {
        console.log(error)
      });

    // Send the fabricObjects array to the backend as JSON

  }

  const handleSorting = () => {
    //duplicating the layers
    let _objectsInCanvas = [...objectsInCanvas];

    //removing the selected layer
    const draggedLayerContent = _objectsInCanvas.splice(dragLayer.current, 1)[0];

    //switching the positions
    _objectsInCanvas.splice(dragOverItem.current, 0, draggedLayerContent)
    setObjectsInCanvas(_objectsInCanvas);

    dragLayer.current = null;
    dragOverItem.current = null;
  }
  const onDragStart = (e, index) => {
    dragLayer.current = index;
  };

  const onDragEnter = (e, index) => {
    dragOverItem.current = index;
  }

  function truncateText(text) {
    const maxLength = 12;
    const ellipsis = '...';

    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, 9) + ellipsis;
    }
  }

  const handleDeleteObject = (index) => {
    // Get the index of the selected object
    const selectedObjectIndex = index;/* Logic to get the selected object index */;

    if (selectedObjectIndex !== -1) {
      // Create a copy of the current objectsInCanvas array
      const updatedObjectsInCanvas = [...objectsInCanvas];

      // Remove the selected object
      updatedObjectsInCanvas.splice(selectedObjectIndex, 1);

      // Update the state with the new array
      setObjectsInCanvas(updatedObjectsInCanvas);
    }
  };

  const drawTextWithProperties = (canvas, textObject) => {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(240, 240, 240, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font properties
    ctx.font = `30px ${textObject.fontFamily}`;
    ctx.fillStyle = textObject.fill;
    ctx.strokeStyle = textObject.stroke;
    ctx.lineWidth = textObject.strokeWidth;
    ctx.shadowColor = textObject.shadowColor;
    ctx.shadowBlur = textObject.shadowBlur;
    ctx.shadowOffsetX = textObject.shadowOffsetX;
    ctx.shadowOffsetY = textObject.shadowOffsetY;

    ctx.fillText('Aa', 10, 30);
    ctx.strokeText('Aa', 10, 30);
  };

  const showLayers = () => {
    if (objectsInCanvas.length === 0) {
      return (
        <div className='NoLayersMessage'>
          <img src='/sadEmojiLayers.png' />
          <p>No layers to display.</p>
        </div>
      );
    };

    return (
      <div>
        {objectsInCanvas.map((object, index) => {
          console.log('object', object);
          if (object.type === 'textbox') {
            const canvas = document.createElement('canvas');
            canvas.width = 60;
            canvas.height = 60;
            drawTextWithProperties(canvas, object);

            return (
              <div className='LayersSectionOfSidebarObjectList'
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={handleSorting}
              >
                <div className='LayersSectionOfSidebarObjectListContent'>
                  <img src={canvas.toDataURL()} alt={`Layer ${index}`} />
                  <div className='LayersSectionOfSidebarObjectListTexts'>
                    <p>Layer {index + 1}</p>
                    <p>{truncateText(object.text)}</p>
                  </div>
                </div>
                <div className='LayersSectionOfSidebarObjectListButtons'>
                  {!object.selectable ?
                    <span className="tooltip" data-tooltip="Unlock">
                      <button onClick={() => toggleLockObject(index)}>
                        <AiOutlineLock />
                      </button>
                    </span>
                    :
                    <span className="tooltip" data-tooltip="Lock">
                      <button onClick={() => toggleLockObject(index)}>
                        <AiFillUnlock />
                      </button>
                    </span>}
                  <span className="tooltip" data-tooltip="Delete">
                    <button onClick={() => handleDeleteObject(index)}>
                      <AiFillDelete />
                    </button>
                  </span>
                </div>
                <button onClick={handleDataBackend}>SEND DATA TO BACKEND</button>

              </div>
            );
          } else if (object.type === 'image') {
            return (
              <div className='LayersSectionOfSidebarObjectList'
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={handleSorting}>
                <div className='LayersSectionOfSidebarObjectListContent'>
                  <img
                    src={object._element.src}
                    width={60}
                    height={60}
                    alt={`Layer ${index + 1}`}
                  />
                  <div className='LayersSectionOfSidebarObjectListTexts'>
                    <p>Layer {index + 1}</p>
                    <p> Your Image</p>
                  </div>
                </div>
                <div className='LayersSectionOfSidebarObjectListButtons'>
                  {!object.selectable ?
                    <span className="tooltip" data-tooltip="Unlock">
                      <button onClick={() => toggleLockObject(index)}>
                        <AiOutlineLock />
                      </button>
                    </span>
                    :
                    <span className="tooltip" data-tooltip="Lock">
                      <button onClick={() => toggleLockObject(index)}>
                        <AiFillUnlock />
                      </button>
                    </span>}
                  <span className="tooltip" data-tooltip="Delete">
                    <button onClick={() => handleDeleteObject(index)}>
                      <AiFillDelete />
                    </button>
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return <>
    <section className='LayersSectionOfSidebar'>
      {
        showLayers()
      }

    </section>
  </>;
};

export default EditSidebarLayers;
