import React, { useContext, useEffect, useState} from 'react';
import { ChatHeader } from 'react-chat-engine'

const RoomHeader = ({room}) => {
  console.log(room)
  return (
    <>
    <h1>Header</h1>
    <ChatHeader />
    <button title="click"/>
    </>
  )
}

export default RoomHeader;