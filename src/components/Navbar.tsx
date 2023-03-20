import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";

const UnauthenticatedRoutes = () => {
    return(
        <>
            <NextLink href="/login">
              <Link mr={2} href="/login">
                Login
              </Link>
            </NextLink>
            <NextLink href="/register">
              <Link mr={2}>Register</Link>
            </NextLink>
          </>
    );
}

interface UserNameProps {
    username: string;
}

const UserName: FC<UserNameProps> = ({ username }) => (    
    <>
        <Text>{username}</Text>
        <NextLink href="/logout">
            <Link mr={2} href="/logout">
                Logout
            </Link>
        </NextLink>
    </>
)

const Navbar = () => {
  const [{ data, fetching, error }] = useMeQuery();

  return (
    <Flex bg="olive" p={4} position="fixed" width={"100%"}>
        <DarkModeSwitch />
        
      <Box ml={"auto"}>
        {fetching ? null : data.me ? (
          <UserName username={data.me.userName}/>
        ) : (<UnauthenticatedRoutes />)}
      </Box>
    </Flex>
  );
};

export default Navbar;
