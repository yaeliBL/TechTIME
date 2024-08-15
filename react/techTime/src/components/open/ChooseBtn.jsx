import React from 'react';
import './ChooseBtn.css' ;

export default function ChooseBtn({ setStatus }) {
  return (
    <>
      <div className='buttons-container'>
        <div className='pink'>
          <button id='pink' onClick={() => { setStatus(2) }}>GET STARTED</button>
        </div>
        <div className='white'>
          <button id='white' onClick={() => { setStatus(1) }}>I ALREADY HAVE AN ACCOUNT</button>
        </div>
      </div>
    </>
  );
}
