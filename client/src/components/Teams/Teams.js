import React, { useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine, ChatHeader } from 'react-chat-engine';

import { auth } from '../../firebase';
import axios from 'axios'

import { useAuth } from '../../contexts/AuthContext';
import RoomHeader from '../../components/Teams/RoomHeader'
import OptionsSettings from '../../components/Teams/OptionsSettings'

const Teams = () => {
  const history = useHistory();
  const { user } =useAuth();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');

  console.log("user", user);
    
  const handleLogout = async () => {
    await auth.signOut();

    history.push('/');
  }

  useEffect(() => {
    if(!user) {
      history.push('/');

      return;
    }

    setName(user.displayName);

    const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob(); //blobs are files to br transferred in binary format

      return new File([data], "userPhoto.jpeg", {type: "image/jpeg"})
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
        "user-name": user.email,
        "user-secret": user.uid
      }
    }).then(() => {
      //if user exists in chatengine
      setLoading(false)
    }) 
    .catch(()=> {
      //create new user - doesn't already exist
      let formdata = new FormData();
      formdata.append('email', user.email);
      formdata.append('username', user.email);
      formdata.append('secret', user.uid);    

      getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name)


            axios.post('https://api.chatengine.io/users',
            formdata,
            {headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
            )
            .then(()=> setLoading(false))
            .catch((error) => console.log(error))
          })
    })
  }, [])

  if(!user || loading) return 'Loading.........'
  console.log("room in team:", room);
  console.log("name in team:", name);
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          PolyChat
        </div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine 
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        renderChatHeader={(chat) => {
          if(chat) {
            // console.log("chatheader",chat.title)
            setRoom(chat.title)
          }
          return <ChatHeader />
        }}
        renderOptionsSettings={(props, chat) => <OptionsSettings {...props} chat={chat} name={name} room={room}/>}
      />
    </div>
  );
}

export default Teams;