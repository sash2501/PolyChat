import { useState } from 'react';
import * as React from 'react';
import { Stack, IStackTokens} from '@fluentui/react/lib/Stack';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Separator } from '@fluentui/react/lib/Separator';
import { GoogleOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { Link } from "react-router-dom";
import { auth } from "../../firebase"

import './Join.css';

const stackTokens: IStackTokens = { childrenGap: 20 };

const Join = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState(''); //initialize as empty string
  const history = useHistory();
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked submit");

    const authObject = { 'Project-ID': process.env.REACT_APP_CHAT_ENGINE_ID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      console.log(username, password);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      console.log("creds set");

      //window.location.reload();
      history.push('./teams');
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };
  console.log(username, password);

  //console.log(window.location);
  
  return (    
    <div className="wholePage"
    style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1516563670759-299070f0dc54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80")`,
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
      backgroundSize: 'cover'
    }}><h1><center> SASSYCODE'S TEAMS </center></h1>    
    <div className="LoginBox">   
      <Stack vertical tokens = {stackTokens} horizontalAlign="center">
        <div className="InnerContainer">   
          <Stack horizontalAlign="center" tokens = {stackTokens}>
            <Separator>Login</Separator>
            
            <TextField 
              label="User Name" 
              placeholder="Please enter user name here" 
              onChange={event => setUserName(event.target.value)}/>
            <TextField 
              label="User Secret" 
              placeholder="Please enter user secret here" 
              onChange={event => setPassword(event.target.value)}/>
            <Stack.Item align="center" >
              <DefaultButton 
                text="Join-Room" 
                onClick={event => handleSubmit(event)} //no response with no input
                />
            </Stack.Item>
            <div className="login-button google"
            onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}><GoogleOutlined /> Sign in with Google </div>      
          </Stack>
          <h1>{error}</h1>
        </div> 
      </Stack>
    </div>    
    </div>
  );
};

export default Join;