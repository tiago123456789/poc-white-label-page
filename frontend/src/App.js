import { useEffect, useState } from 'react';
import { Form, Input, Label, Button } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [configs, setConfigs] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/configs')
      .then(response => response.json())
      .then(({ data }) => {
        setConfigs(data)
        window.document.body.style.color = data.textColor; 
        window.document.body.style.background = data.backgroundColor
      });

  }, [])

  if (!configs) {
    return (<p>Loading....</p>)
  }

  return (
    
    <div className="container">
      <h1 className="text-center">{configs.companyName}</h1>
      { configs.logo && 
        <img src={configs.logo} style={{ marginLeft: "37%"}} width="25%" height="150px"/>
      }
      <Form>
        <Label>Email:</Label>
        <Input/>
        <br/>
        <Label>Password:</Label>
        <Input type="password"/>
        <br/>
        <Button color={configs.buttonColor}>Login</Button>
      </Form>
      {/*       
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
