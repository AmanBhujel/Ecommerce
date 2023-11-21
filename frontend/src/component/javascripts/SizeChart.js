'use client'
import React, { useEffect, useRef, useState } from 'react';
import '../styles/SizeChart.css'

const SizeChart = ({closeModal,isModalOpen}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
          }
        };
        if (isModalOpen) {
          document.body.addEventListener('click', handleOutsideClick);
        }
        return () => {
          document.body.removeEventListener('click', handleOutsideClick);
        };
      }, [isModalOpen, closeModal]);
    
    return (
        <div>
            {isModalOpen ? (
                <div className="modalSizeChart" ref={modalRef}>
                    <div className="modalSizeChart-content">
                        <h2>Size Chart</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Chest (inches)</th>
                                    <th>Waist (inches)</th>
                                    <th>Hip (inches)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>S</td>
                                    <td>36-38</td>
                                    <td>28-30</td>
                                    <td>38-40</td>
                                </tr>
                                <tr>
                                    <td>M</td>
                                    <td>38-40</td>
                                    <td>30-32</td>
                                    <td>40-42</td>
                                </tr>
                                <tr>
                                    <td>L</td>
                                    <td>40-42</td>
                                    <td>32-34</td>
                                    <td>42-44</td>
                                </tr>
                                <tr>
                                    <td>XL</td>
                                    <td>42-44</td>
                                    <td>34-36</td>
                                    <td>44-46</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SizeChart;
