import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/icons/logo.svg";
import { close, hamburger } from "../assets/svgs/svg";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";
import '../index.css';
import {
  connect as connectWallet,
  checkConnection,
  disconnect as disconnectWallet,
  isDisconnected
} from "../utils/helpers.js"

const Navbar = () => {
  const navigate = useNavigate();
  const [openNavBar, setOpenNavBar] = useState(false);
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    navigate('/');
  }

  const connect = async () => {
    try {
      const account = await connectWallet();
      if (account) {
        setUser(account);
        setIsConnected(true);
      }
    } catch (err) {
      setIsConnected(false);
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      if (!isDisconnected()) {
        checkConnection().then((account) => {
          if (account) {
            setIsConnected(true)
            setUser(account);
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "block", lg: "flex" }}
        padding={'30px'}
        marginLeft={'50px'}
        marginRight={'50px'}

      >
        <Flex
          alignItems="center"
          justifyContent="space-around"
          display={{ base: "none", lg: "flex" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Link to="/">
              <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
              <Text
                cursor="pointer"
                ml={{ base: "0", lg: "70px" }}
                mt={{ base: "-10px", lg: "-35px" }}
                color="white"
                fontFamily={"-moz-initial"}
                fontSize={'20px'}


              >
                DeHeritage
              </Text>
            </Link>
            <Box
              onClick={() => setOpenNavBar(!openNavBar)}
              display={{ base: "block", lg: "none" }}
            >
              {openNavBar ? close : hamburger}
            </Box>
          </Flex>
          <a href="/#about-us">
            <Text
              cursor="pointer"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "rgb(69, 252, 228)" }}
              color="white"
            >
              About us
            </Text>
          </a>
          <a href="/#how-it-works">
            <Text
              cursor="pointer"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "rgb(69, 252, 228)" }}
              color="white"
            >
              How it works
            </Text>
          </a>
        </Flex>
        {isConnected ?
          <button className='disconnectbtn'
            onClick={disconnect}
          >
            Disconnect
          </button>
          :
          <button className='disconnectbtn'
            onClick={connect}
          >
            Connect
          </button>
        }


      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="20px"
        display={{ base: "flex", lg: "none" }}
      >
        <Link to="/">
          <Image w={{ base: "40px", lg: "60px" }} src={logo} alt="logo" />
          <Text
            cursor="pointer"
            ml={{ base: "0", lg: "70px" }}
            mt={{ base: "-10px", lg: "-35px" }}
            color="white"
            fontFamily={"-moz-initial"}
            fontSize={'28px'}


          >
            DeHeritage
          </Text>
        </Link>
        <Box
          onClick={() => setOpenNavBar(!openNavBar)}
          display={{ base: "block", lg: "none" }}
        >
          {openNavBar ? close : hamburger}
        </Box>
      </Flex>

      {openNavBar && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={{ base: "block", lg: "flex" }}
          height={{ base: "100vh", lg: "" }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-around"
            display={{ base: "block", lg: "flex" }}
            w="100%"
          >
            <Text
              cursor="pointer"
              textAlign="center"
              ml={{ base: "0", lg: "100px" }}
              mt={{ base: "20px", lg: "0" }}
              _hover={{ color: "rgb(69, 252, 228)" }}
              color="white"
            >
              About us
            </Text>
            <Text
              cursor="pointer"
              textAlign="center"
              mt={{ base: "20px", lg: "0" }}
              ml={{ base: "0", lg: "100px" }}
              _hover={{ color: "rgb(69, 252, 228)" }}
              color="white"
            >
              How it works
            </Text>
          </Flex>
          {
            isConnected ?
              <button className='disconnectbtn'
                onClick={disconnect}
              >
                Disconnect
              </button>
              :
              <button className='disconnectbtn'
                onClick={connect}
              >
                Connect
              </button>
          }
        </Flex>
      )}
    </>
  );
};

export default Navbar;
