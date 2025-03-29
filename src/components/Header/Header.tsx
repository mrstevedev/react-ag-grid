import { Box, Heading } from "@chakra-ui/react";
import CreateButton from "../Button/CreateButton";

interface HeaderProps {
    onOpen: () => void;
}

export default function Header({ onOpen }: HeaderProps) {
    return (
        <Box padding="1rem" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Heading margin="0px 0 -6px 0" size="sm">
                    React AG Grid
                </Heading>
                <sub>Server Transactions</sub>
            </Box>

            <CreateButton onOpen={onOpen} />
        </Box>
    );
}
