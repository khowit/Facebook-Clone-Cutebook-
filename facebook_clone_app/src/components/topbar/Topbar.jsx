import React, { useContext} from 'react'
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {

  const { user } = useContext(AuthContext) ;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  return (
    <div className='topbarContainer'>
        <div className='topbarLeft'>
            <Link to="/" style={{textDecoration:"none"}}>
                <span className='logo'>Cutebook</span>
            </Link>
        </div>
        <div className='topbarCenter'>
            <div className='searchbar'>
                < SearchIcon className='searchIcon'/>
                <input placeholder='Search' className='searchInput' />
            </div>
        </div>
        <div className='topbarRight'>
            <div className='topbarLink'>
                <span className='topbarLink'>Homepage</span>
                <span className='topbarLink'>Timeline</span>
            </div>
            <div className='topbarIcons'>
                <div className='topbarIconsItem'>
                    <PersonIcon />
                    <span className='topbarIconBadge'>1</span>
                </div>
                <div className='topbarIconsItem'>
                    <ChatIcon />
                    <span className='topbarIconBadge'>2</span>
                </div>
                <div className='topbarIconsItem'>
                    <NotificationsIcon />
                    <span className='topbarIconBadge'>1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt='' className='topbarImage'></img>
            </Link>
        </div>
    </div>
  )
}
