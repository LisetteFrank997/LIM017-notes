import React from "react";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { db, updateNote } from "../Firebase/Confi";
import { addDoc,
  collection,
  onSnapshot,
  where,
  query,
  //deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import '../Style-App/pages.css';
import { useNavigate } from "react-router-dom";




export function Notes(){

  const handletextChange= (e) =>{
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }
   const initialStateValue= {
    description: "",
  };

  const [values, setValues]= useState(initialStateValue);
  const [currentId, setCurrentId] = useState('');
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    addNotes(values);
    setValues({ ...initialStateValue });
  }

 
  const getNoteById = async (id) => {
    const docRefId = doc(db, "notes", id);
    const docSnap = await getDoc(docRefId);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setValues({ ...docSnap.data()})
  }

  const [notes, setNotes] = useState([]);

  const addNotes = async (objectNote, objectData) => {
    console.log(currentId);
    if (currentId === '') {
      const docRef = await addDoc(collection(db, "notes"), objectNote);
      console.log("Document written with ID: ", docRef.id);
    } else {
      await updateNote(currentId, objectNote.description).then(() => {
        getNotes();
      })
    }
  };

  const getNotes = async () => {
    const q =  query(
      collection(db, "notes"),
      where("author", "==", localStorage.getItem("email"))
    );
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setNotes(docs);
    });
  };
  getNotes();

  useEffect(() => {
    const initialStateValues = {
      description: "",
      author: localStorage.getItem("email"),
    };
    if (currentId === '') {
      setValues({...initialStateValues});
    } else {
      getNoteById(currentId)
    }
    getNotes()
  }, [currentId]);
  
  const {user, logOut, loading}= useAuth();
  const navigate= useNavigate();
  const handleLogout = async() =>{
    try{
      await logOut();
      navigate('/');
    }catch(error){
      console.log(error.message);
    }
  }
  if(loading) return <h1>loading</h1>

 
  
  //function estadoProducto(){}
  return(
    <div className='notesConteiner'>
      <nav className="navar">
        <div>Bienvenido {user.displayName || user.email}</div>
        <button id="logOut" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>
      <form className="inputConteiner" onSubmit={handleSubmit}>
      <textarea className="createNote" rows="3" name="description" placeholder="Crea una nueva nota" onChange={handletextChange} value={values.description}></textarea>
      <button className="upNote">Crear Nota</button>
      </form>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&family=Karla:wght@200;800&display=swap" rel="stylesheet"></link>
      <div>
        <div className="notesList">
          {notes.map((note) => (
            <div className="conteinerNote" key={note.id} id={note.id}>
              <div className="descriptionNote">
                <textarea className="notesFile" rows="3" value={note.description}></textarea>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
