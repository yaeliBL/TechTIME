import React, { useState } from 'react'
import './open.css'
import logoText from '../imges/logoText.png'
import logoAirplan from '../imges/logoAirplan.png'
import ChooseBtn from '../components/open/chooseBtn';
import SignUp from '../components/open/signUp';
import Login from '../components/open/Login';

export default function Open() {
    const [status, setStatus] = useState(0);
    return (
        <>
<div >
<div className='both'>        
    <div className='logoAirplan'>
        <img src={logoAirplan}></img>
        </div>
    <div className='logoText'>
        <img src={logoText} ></img>
        </div>
</div>
        <div>{status == 0 && <ChooseBtn setStatus={setStatus} />}</div>
</div>
            
            {status == 1 && <Login />}
            {status == 2 && <SignUp/> }

    </>
  )
}
