import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import { useState } from "react";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { createHeritage } from "../utils/helpers.js";

const Form = () => {
  let navigate = useNavigate();
  const [heir, setHeir] = useState("");
  const [checkInterval, setCheckInterval] = useState();
  const [createLoading, setCreateLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNextOfKin, setUserNextOfKin] = useState("");
  const getUserDetails = localStorage.getItem("userDetails");

  const create = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const res = await createHeritage(heir, checkInterval * 3600 * 24);
      const userDetails = { userName, userNextOfKin, checkInterval, heir };
      console.log(userDetails);
      localStorage.setItem("userDetails", userDetails);
      setCreateLoading(false);
      if (res) {
        navigate("/select-token");
      }
    } catch (error) {
      toaster.danger("An Error occured!");
      setCreateLoading(false);
    }
  };

  const handleLegateeChange = (event) => {
    setHeir(event.target.value);
  };

  const handleCheckIntervalChange = (event) => {
    setCheckInterval(event.target.value);
  };


  return (
    <div className="App">
      <Navbar />
      <Box p={{ base: "15px 10px", lg: "15px 50px" }} margin="50px 0">
        <Text
          color="white"
          fontSize={{ base: "20px", lg: "50px" }}
          fontWeight="black"
          mb="20px"
        >
          Let's get you started!
        </Text>
        <Box h="1px" bgColor="brand.grey"></Box>
        <form>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacingX="40px"
            spacingY="20px"
            mt="20px"
          >
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              color="white"
              onChange={(e) => setUserName(e.target.value)}
              defaultValue={getUserDetails && getUserDetails.userName}
              bg="none"
            />
            <TextInput
              label="Next of Kin Full Name"
              placeholder="Enter your next of kin full name"
              type="text"
              color="white"
              onChange={(e) => setUserNextOfKin(e.target.value)}
              defaultValue={getUserDetails && getUserDetails.userNextOfKin}
              bg="none"
            />
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacingX="40px"
            spacingY="20px"
            mt="20px"
          >
            <TextInput
              label="Next of kin wallet address"
              placeholder="Enter your next of kin wallet address"
              type="text"
              color="white"
              onChange={handleLegateeChange}
              defaultValue={getUserDetails && getUserDetails.heir}
              bg="none"
            />
            <TextInput
              label="CheckInterval (In Days)"
              placeholder="Enter how frequently you want to check in"
              type="number"
              color="white"
              onChange={handleCheckIntervalChange}
              defaultValue={getUserDetails && getUserDetails.checkInterval}
              bg="none"
            />
          </SimpleGrid>
          <CustomButton
            w={{ base: "90%", lg: "60%" }}
            bg="rgb(69, 252, 228)"
            d="flex"
            hover="none"
            color="white"
            m="40px auto"
            hoverColor="white"
            isLoading={createLoading}
            onClick={create}
            border="1px solid #15F4CB"
            disabled={!userName || !userNextOfKin || !heir || !checkInterval}
          >
            Secure Now
          </CustomButton>
        </form>
      </Box>
    </div>
  );
};

export default Form;
