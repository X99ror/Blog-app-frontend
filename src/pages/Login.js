import React , {useState} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useDispatch } from "react-redux"
import { authActions } from "../redux/store.js"
import  toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input , setInputs]= useState({
    email:'',
    password:''
  })
  const handleChange = (e) =>{
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  }

  const handleSubmit= async(e) =>{
    try {
      e.preventDefault()
    const {data} = await axios.post('api/v1/user/login',{email:input.email,password:input.password})
    if(data.success){
      localStorage.setItem('userId' , data?.user._id)
      dispatch(authActions.login());
      toast.success('User Login successfully')
      navigate("/")
    }
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <>
     <form onSubmit={handleSubmit}>
     <Box 
      maxWidth={450} 
      display="flex" 
      flexDirection={'column'} 
      alignItems="center" 
      justifyContent={"center"} 
      margin="auto" 
      marginTop={5}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      borderRadius={5}
      >
      <Typography 
      variant='h4' 
      sx={{textTransform:'uppercase'}} 
      padding={3} 
      textAlign="center"
      >Login
      </Typography>
      <TextField
      placeholder='email'
      value={input.email}
      name='email'
      margin='normal'
      type={'email'} 
      onChange={handleChange}
      required
      />
       <TextField
      placeholder='password'
      value={input.password}
      name='password'
      margin='normal'
      type={'password'}
      onChange={handleChange} 
      required
      />
      <Button
      type='submit'
      sx={{borderRadius:3,marginTop:3}}
      variant='contained'
      color='primary'
      
      >Submit</Button>
      <Button 
      onClick={() => navigate('/register')}
      sx={{borderRadius:3,marginTop:3}}

      >
        Not a User? Please Register
        </Button>
      </Box>
     </form>
    </>
  );
};


export default Login; 
