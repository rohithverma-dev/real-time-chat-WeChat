import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../MyComponents/Chatbox";
import MyChats from "../MyComponents/MyChats";
import SideDrawer from "../MyComponents/miscellaneous/SideDrawer.js";
import { ChatState } from "../../Context/ChatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" flexDir={"row"} justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
