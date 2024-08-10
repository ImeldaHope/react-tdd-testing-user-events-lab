import { useState } from "react";

function App() {
  const [isChecked, setIsChecked] = useState({
    first: false,
    second: false,
    third: false,
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleCheck(e){
    const { id, checked } = e.target;
    setIsChecked(prevState => ({
      ...prevState,
      [id]: checked
    }));
  }


  function handleSubmit(e){
    e.preventDefault();
    setIsSubmitted(true);
    
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="user name"/>
        <input type="email" placeholder="email address"/>        
        <input
            type="checkbox"
            id="first"
            checked = {isChecked.first}
            aria-checked = {isChecked.first}
            onChange ={handleCheck}
        />
        <label htmlFor="first">Volunteer</label>        
        <input
            type="checkbox"
            id="second"
            checked = {isChecked.second}
            aria-checked = {isChecked.second}
            onChange ={handleCheck}
        />
        <label htmlFor="second">Reading</label>        
        <input
            type="checkbox"
            id="third"
            checked = {isChecked.third}
            aria-checked = {isChecked.third}
            onChange ={handleCheck}
        />
        <label htmlFor="third">Public Speaking</label>
        <input type="submit"/>
      </form>
      {isSubmitted ? <p>Your form has been submitted</p> : null}
    </main>
  );
}

export default App;
