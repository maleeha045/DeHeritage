import { Box, Image, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import HeadTag from "../common/headTag";

const SuccessMessage = () => {
  const imgLink = "https://pngimg.com/uploads/confetti/confetti_PNG86957.png";
  return (
    <div className="App">
      <HeadTag title="Success" />
      <Navbar />

      <Box m="80px auto" w="80%">
        <Image src={imgLink} alt="congrats" w="200px" m="20px auto" />
        <Text
          color="white"
          fontSize={{ base: "20px", lg: "50px" }}
          fontWeight="black"
          mt="60px"
          textAlign="center"
        >
          Congratulations!
        </Text>
        <Text
          textAlign="center"
          fontSize={{ base: "12px", lg: "16px" }}
          color="brand.white"
          w={{ base: "100%", lg: "40%" }}
          m="20px auto"
        >
          You have successfully updated your check in interval and you have
          successfully checked in today
        </Text>
      </Box>
      <div className="gohome">
        <Link to="/">
          <button className="gohomebtn"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;
