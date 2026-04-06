import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import BackDrop from './BackDrop';
import { logoutUser } from '../store/actions';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logoutUser(navigate))
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        className='sm:border sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width:"400px" }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
            paper: {
                sx: {marginTop: '53px'}
            },
            list: {
                sx: {width: '160px'}
            }
        }}
      >
        <Link to="/profile">
            <MenuItem 
                className='flex gap-2' 
                onClick={handleClose}>
                <BiUser className='text-xl'/>
                <span className='font-bold text-[16px]'>
                    {user?.username}
                </span>
            </MenuItem>
        </Link>
        <Link to="/profile/orders">
            <MenuItem 
                className='flex gap-2' 
                onClick={handleClose}>
                <FaShoppingCart className='text-xl'/>
                <span className='font-semibold text-[16px]'>
                    Order
                </span>
            </MenuItem>
        </Link>
  
        <MenuItem 
            className='flex gap-2' 
            onClick={logOutHandler}>
            <div className='font-semibold w-full flex gap-2 items-center bg-linear-to-r from-purple-600 to-red-500 py-1 text-white rounded-sm'>
                <IoMdExit className='text-xl'/>
                <span className='font-bold text-[16px]'>
                    Logout
                </span>
            </div>
        </MenuItem>
        
      </Menu>

      {open && <BackDrop/>}
    </div>
  );
}

export default UserMenu