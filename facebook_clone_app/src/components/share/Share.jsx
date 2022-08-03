import React, {useContext, useRef, useState} from 'react'
import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandle = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;

            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
    
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }  

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
  };

  return (
    <div className='share'>
        <div className='shareWrapper'>
            <div className='shareTop'>
                <img className='shareProfileImg' src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                <input placeholder="What's in you mind?" className='shareInput' ref={desc}/>
            </div>
            <hr className='shareHr' />
            {file && (
                <div className='shareImgContainer'>
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <CancelIcon className='shareCancelImg' onClick={() => setFile(null)} />
                </div>
            )}
            <form className='shareBottom' onSubmit={submitHandle}>
                <div className='shareOptions'>
                    <label htmlFor="file" className='shareOption'>
                        <PermMediaIcon htmlColor="tomato" className='shareIcon' />
                        <span className='shareOptionText'>Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className='shareOption'>
                        <LabelIcon htmlColor="blue" className='shareIcon' />
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className='shareOption'>
                        <LocationOnIcon htmlColor="green" className='shareIcon' />
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className='shareOption'>
                        <EmojiEmotionsIcon htmlColor="goldenrod" className='shareIcon' />
                        <span className='shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className='shareButton' type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}
