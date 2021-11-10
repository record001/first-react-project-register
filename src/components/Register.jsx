import React from "react";
import {useRef, useState} from "react";
import Content from "./Content";





function Register(){

 let buttonValue = useRef(null)
 let hintValue = useRef(null)

 let emailValue = useRef(null)
 let passwordValue = useRef(null)

 let bottomText1Value = useRef(null)
 let bottomText2Value = useRef(null)

 let successTextValue = useRef(null)

 let [lang, setLang] = useState("uz")

  function changeColor(){
    // document.querySelector("body").style.backgroundColor = "#121212"
    if(buttonValue.current.textContent === "day"){
    document.querySelector("body").style.backgroundColor = "#E7EAED"
    buttonValue.current.textContent = "night"
    hintValue.current.style.color = "black"

    }else if(buttonValue.current.textContent === "night") {
    document.querySelector("body").style.backgroundColor = "#121212"
    buttonValue.current.textContent = "day" 
    hintValue.current.style.color = "white"

    }





       

    
  }

 
  function Correction1(){
    if(emailValue.current.value !== "eve.holt@reqres.in"){
      bottomText1Value.current.style.opacity = "1"
    }else{
      bottomText1Value.current.style.opacity = "0"
    }
  }
  
  function Correction2(){
    if(passwordValue.current.value !== "pistol"){
      bottomText2Value.current.style.opacity = "1"
    }else{
      bottomText2Value.current.style.opacity = "0"
    }
  }

  async function FetchAPI(e) {
    e.preventDefault()

    let respond = await fetch("https://reqres.in/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'        
      },
      body: JSON.stringify({
        email: emailValue.current.value,
        password: passwordValue.current.value
      }) 
    });

    let data =await respond.json()
    console.log(data);

    emailValue.current.value = "";
    passwordValue.current.value = ""

    if(data.id === 4){
      successTextValue.current.style.opacity = "1"
    }else {
      successTextValue.current.style.opacity = "0"
      
    }
    
    
  }
  
  


  return (
    <div className = "container">
      
      <div className="nav_wrapper">
        
     <select  id="select_lang" onChange = {(e) => {
        setLang(e.target.value);
      }}>
        <option value="uz">UZ</option>
        <option value="ru">RU</option>
        <option value="eng">ENG</option>
      </select>

      <button className = "theme_btn" ref={buttonValue} onClick = {changeColor}>night</button>
      </div>
      

      <p className = "text" ref = {hintValue}>{Content[lang].hint} </p>


      <form className = "form" onSubmit = {FetchAPI}>

        <h2 className = "title">{Content[lang].title}</h2>

        
        <input id = "email" ref = {emailValue} className = "input" type="email" placeholder ="Email" onChange = {Correction1}/>
        <p className = "bottom_text1" ref = {bottomText1Value}>{Content[lang].textEmail}</p>

               
        <input id = "password" ref = {passwordValue} className = "input"  type="text" placeholder ="Password" onChange = {Correction2}/>

        <p className = "bottom_text2" ref = {bottomText2Value}>{Content[lang].textPassword}</p>

        <button className = "submit_btn" type="submit">submit</button>
        <p ref = {successTextValue} className ="success_text">{Content[lang].greeting}</p>

       
          <img className="img" src="https://picsum.photos/250/150" alt="img" />
        

      </form>

    </div>
  )
}

export default Register