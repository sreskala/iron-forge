import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import NextLink from "next/link";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { on } from "events";
import { isServer } from "../utils/isServer";

const UnauthenticatedRoutes = () => {
  return (
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
};

interface UserNameProps {
  username: string;
  onLogout: () => void;
  isLoading: boolean;
}

const UserName: FC<UserNameProps> = ({ username, onLogout, isLoading }) => (
  <>
    <Text>{username}</Text>
    <Button
      isLoading={isLoading}
      isDisabled={isLoading}
      variant={"link"}
      onClick={onLogout}
    >
      Logout
    </Button>
  </>
);

const Navbar = () => {
  const [{ data, fetching, error }] = useMeQuery({
    pause: isServer()
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  return (
    <Flex bg="olive" p={4} position="fixed" width={"100%"}>
      <DarkModeSwitch />

      <Box ml={"auto"}>
        {fetching ? null : data.me ? (
          <UserName
            username={data.me.userName}
            onLogout={() => logout(null)}
            isLoading={logoutFetching}
          />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
