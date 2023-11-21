'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const TextContext = createContext();

// Create a custom hook to access the context
export const useTextContext = () => {
    return useContext(TextContext);
};

// Create a provider component to wrap your application
export const TextProvider = ({ children }) => {
    const [text, setText] = useState('');
    const [addText, setAddText] = useState(false);
    const [showTextEditor, setShowTextEditor] = useState(false);
    const [fontSize, setFontSize] = useState(20);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontColor, setFontColor] = useState('black');
    const [showTextOutlines, setShowTextOutlines] = useState(false)
    const [outlineWidth, setOutlineWidth] = useState(1)
    const [shadowBlur, setShadowBlur] = useState(1); 
    const [shadowColor, setShadowColor] = useState('#000000'); 
    const [outlineColor, setOutlineColor] = useState('#000000'); 
    const [textRadius,setTextRadius]=useState(1);
    const [textSpacing,setTextSpacing]=useState(1);
    const [shadowOffsetX,setShadowOffsetX]=useState(1);
    const [shadowOffsetY,setShadowOffsetY]=useState(1);
    const [fontWeight, setFontWeight] = useState(500); // Initial font weight
    const [preDesignedText,setPreDesignedText]=useState([]);
    const [addPreDesignedText,setAddPreDesignedText]=useState(false);
    return (
        <TextContext.Provider value={{addPreDesignedText,setAddPreDesignedText ,preDesignedText,setPreDesignedText ,fontWeight, setFontWeight,shadowOffsetX,setShadowOffsetX,shadowOffsetY,setShadowOffsetY ,textSpacing,setTextSpacing, textRadius,setTextRadius, outlineColor, setOutlineColor, shadowColor, setShadowColor, shadowBlur, setShadowBlur, showTextOutlines, setShowTextOutlines, outlineWidth, setOutlineWidth, text, fontFamily, setFontFamily, setText, fontSize, setFontSize, showTextEditor, setShowTextEditor, addText, setAddText, fontColor, setFontColor }}>
            {children}
        </TextContext.Provider>
    );
};
