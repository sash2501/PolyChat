import React, { useState } from 'react'

import { Button, deleteChat } from 'react-chat-engine'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { DefaultButton } from '@fluentui/react/lib/Button';

const OptionsSettings = (props) => {
    const [state, setState] = useState({
        collapsed: true,
        hovered: false
    })
    const { chat, room , name } = props

    console.log("chat props",props, room, name)

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <div 
                onMouseEnter={() => setState({ ...state, hovered: true })}
                onMouseLeave={() => setState({ ...state, hovered: false })}
                onClick={() => setState({ ...state, collapsed: !state.collapsed })}
                style={state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
            >
                <div style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                    Options
                </div>

                {
                    state.collapsed ?
                    <LeftOutlined style={styles.collapseIcon} /> :
                    <DownOutlined style={styles.collapseIcon} />
                }
            </div>
            
            {
                !state.collapsed &&
                <div>
                    <div style={{ height: '12px' }} />

                    <Button 
                        value="Join Video Call" 
                        theme='primary'
                        style={{ width: '100%', marginBottom: '12px' }}
                    />
                    <Button 
                        value="Delete" 
                        theme='danger'
                        icon='delete'
                        onClick={() => deleteChat(props, chat.id, (data) => {})}
                        style={{ width: '100%', marginBottom: '12px' }}
                    />
                    <h2>Adding here</h2>
                    <Link to={`/call?name=${name}&room=${room}`}>
                      <Button 
                        value="Join-Room" 
                        theme='primary'
                        style={{ width: '100%', marginBottom: '12px' }}
                        onClick={event => (!name || !room)? event.preventDefault() : null} //no response with no input
                      />  
                    </Link>
                </div>
            }
        </div>
    )
}

export default OptionsSettings

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}