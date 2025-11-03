import React from 'react'
import { useEffect } from "react"
import { serverUrl } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { setMessages } from '../redux/msgSlice'
import axios from 'axios'

const getMessages = () => {
    const dispatch = useDispatch();
    const { userData, selectedUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/msg/get-msgs/${selectedUser._id}`, {
                    withCredentials: true
                });
                dispatch(setMessages(result.data));
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();

    }, [selectedUser, userData]) 
}

export default getMessages
