import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
// import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);   // for password 
  const handleClick = () => setShow(!show);  // for password
  const toast = useToast();   //  notification
  const [email, setEmail] = useState("");  // login
  const [password, setPassword] = useState("");  // login
  const [loading, setLoading] = useState(false);  // while loading

  const history = useNavigate();
  const { setUser } = ChatState();   // useContext



  const submitHandler = async () => {  // login form submisiion
    setLoading(true);

    if (!email || !password) {      // required email , password 
      toast({    // notification ( required email , password )
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;   
    }
    //  api call starts
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data}  = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      // console.log(" login api data " , data );
      toast({      // notification Login Successfully
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);    // useContext   // _id , name , email pic , success , token 
      localStorage.setItem("userInfo", JSON.stringify(data));   // _id , name , email pic , success , token 
      setLoading(false);
      history("/chats");
    } catch (error) {   // notification - Login Failed
      toast({     // notification - Login Failed
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    // api call ends
  };


 

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
