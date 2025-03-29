import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { RiAddFill } from "react-icons/ri";

const CreateButton = ({ onOpen }: any) => {
  const btnRef = useRef<any>();

  return (
    <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
      <RiAddFill
        style={{ fontSize: "1.4rem", position: "relative", right: 3 }}
      />
      Create
    </Button>
  );
};

export default CreateButton;
