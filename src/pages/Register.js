import React , {useState} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios"
const Register = () => {
  const navigate = useNavigate()
  const [input , setInputs]= useState({
    username:'',
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
    const {data} = await axios.post('api/v1/user/register',{username:input.username,email:input.email,password:input.password})
    if(data.success){
      toast.success('User Registered successfully')
      navigate("/login")
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
      <Typography variant='h4' sx={{textTransform:'uppercase'}} padding={3} textAlign="center">Register</Typography>
      <TextField
      placeholder='username'
      value={input.username}
      name='username'
      margin='normal'
      type={'text'}
      onChange={handleChange}
      required 
      />
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
      onClick={() => navigate('/login')}
      sx={{borderRadius:3,marginTop:3}}

      >
        Already Registered?? Please Login
        </Button>
      </Box>
     </form>
    </>
  );
};

export default Register;
