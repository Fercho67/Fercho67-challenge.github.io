import { addDoc, collection } from "firebase/firestore/lite";
import { useState } from "react";
import { Link } from "react-router-dom";
import json from "../data/db.json";
import { db } from "../firebase";
import DynamicInput from "./DynamicInput";


function Form() {
  const [modal, setModal] = useState('');
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let usersRef = collection(db, "users");
    try {
      let user = await addDoc(usersRef, form);
      let path = user.path.split("/")[1];
      setModal(`${path}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <form className="box container" onSubmit={handleSubmit}>
      
        {json.items.map((item) => (
          
          <div className="field" key={item.name}>
            <DynamicInput item={item} handleChange={handleChange} />
          </div>
        ))}
      </form>
      <div className={`modal ${modal ? "is-active" : ""}`}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="message is-primary">
            <div className="message-header">
            
              <div className="content">
                Felicitaciones, sus datos han sido guardados.<br /> 
                Para acceder a los mismos haga click en el siguiente enlace: 
                <div className="label"><Link to={`/user/${modal}`}> Ver datos</Link></div>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" onClick={()=>setModal('')} aria-label="close" />
      </div>
    </>
  );
}

export default Form;
