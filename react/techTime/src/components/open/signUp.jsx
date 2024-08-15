import  {  useState } from 'react'
import { useDispatch } from 'react-redux';

  import './SignUp.css';
  
  export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
  
    const detailsToUser = {
      "id": 0,
      "mail": mail,
      "firstName": firstName,
      "lastName": lastName,
      "password": password,
      "status": status,
      "image": `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (verify === password) {
        dispatch({
          type: 'ADD_USER',
          payload: detailsToUser
        });
        setFirstName('');
        setLastName('');
        setStatus('');
        setMail('');
        setPassword('');
        setVerify('');
      } else {
        console.log("Passwords don't match");
        setErrorMessage("Passwords don't match!"); // הצגת הודעת שגיאה במידה והססמאות לא תואמות

      }
    };
  
    return (
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="signup-input" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="signup-input" />
          <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="signup-input" />
          <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="signup-input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />
          <input type="password" placeholder="Verify Password" value={verify} onChange={(e) => setVerify(e.target.value)} className="signup-input" />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="signup-button">Create Account</button>
        </form>
      </div>
    );
  }
  