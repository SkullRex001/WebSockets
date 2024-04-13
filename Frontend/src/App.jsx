import { useEffect, useState } from 'react'

import './App.css'

function getCurrentTime() {

  const now = new Date();


  let hours = now.getHours(); 
  const minutes = now.getMinutes(); 
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 


  const formattedHours = (hours < 10 ? '0' : '') + hours;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

  const currentTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return currentTime;
}

import { Container, Spinner, Flex , Box ,StackDivider} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
function App() {

  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState([])
  const [sentmessage, setSentMessage] = useState([])
  console.log(message)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/')

    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }

    socket.onmessage = (message) => {
      console.log(message)
      console.log("Recieved Message", message.data)
      setMessage((m) => [...m, message.data])
    }
  }, [])


  if (!socket) {
    return (
      <>
        <Container w={"100vw"} height={"100vw"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Spinner size={"xl"} />
        </Container>
      </>
    )
  }


  return (
    <>
      <Container my={50}>
        <Flex gap={5}>
          <Input placeholder='Type Message' onChange={(e) => { setSentMessage(e.target.value) }} />
          <Button colorScheme='blue' onClick={() => {
            socket.send(sentmessage)
          }}>Button</Button>
        </Flex>
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch' 
          my={5}
        >

          {message? message.map((text , index)=>{
            return (  <Box h='40px' bg='#2E8BC0' key={index} p={2} borderRadius={10} display={"flex"} justifyContent={"space-between"}>
            <Text as={"i"} >{text}  </Text>
            {getCurrentTime()} 
          </Box>)

          }): 'No Message Yet'}
         
        </VStack>
       
      </Container>
    </>
  )
}

export default App
