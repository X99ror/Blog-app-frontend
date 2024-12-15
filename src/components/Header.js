import React, {useState} from 'react'
import { Box,AppBar,Toolbar,Button, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId")
    const [value,setValue] = useState()
    const handleLogout = (e)=>{
        try {
            dispatch(authActions.logout())
            toast.success("Logout Successsfully")
            navigate("/")
            localStorage.clear()
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>
                Himanshu's Blog App
            </Typography>
            {isLogin && <Box display={'flex'} marginLeft="auto" marginRight="auto">
                <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val )} >
                    <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>
                    <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"/>
                    <Tab label="Create Blogs" LinkComponent={Link} to="/create-blogs"/>

                </Tabs>
            </Box>}
            <Box display={'flex'} marginLeft="auto">
                {!isLogin && 
                (<>
                
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/register">Register</Button>
                    
                </>)
                }
                <Button sx={{margin:1,color:'white'}} onClick={handleLogout}>Logout</Button>
            </Box>
        </Toolbar>

    </AppBar>
    
    </>
  )
}

export default Header