import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import loader from '../assets/loader.gif'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {setAvatarRoute} from '../utils/APIRoutes'
import {Buffer} from 'buffer'

export default function SetAvatar() {
    const api="https://api.multiavatar.com/45678945";
    const navigate=useNavigate();
    const [avatars, setAvatars]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [selectedAvatar, setSelectedAvatar]=useState(undefined);
    const toastOptions={
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      }
      const setprofilePicture=async ()=>{};
      useEffect(()=>{
        (async function axiosFunction(){
            const data=[];
          for(let i=0;i<4;i++){
              const image=await axios.get(
                  `${api}/${Math.round(Math.random()*1000)}`)
                  const buffer=new Buffer(image.data);
                  data.push(buffer.toString("base64"));
          }
          setAvatars(data);
          setIsLoading(false);
        })();
          
      },[])
  return (
      <>
         <Container>
             <div className="title-container">
                 <h1>Pick an avatar as your profile picture.</h1>
             </div>
             <div className="avatars">
                 {
                     avatars.map((avatar,index)=>{
                         return (
                             <div
                             key={index} 
                             className={`avatar ${
                                 selectedAvatar===index ? "selected" :""
                             }`}>
                                 <img src={`data:image/svg+xml:based64, ${avatar}`} alt="avatar" 
                                 onClick={()=>setSelectedAvatar(index)}
                                 />
                             </div>
                         )
                     })
                 }
             </div>
         </Container>
         <ToastContainer/>
      </>
  )
}

const Container=styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            img{
                height: 6rem;
            }
        }
    }

`;
