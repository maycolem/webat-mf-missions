import { useAppDispatch } from "@/app";
import { setUser } from "@/features";
import {
  useGetMissionsQuery,
  useLoginMutation,
} from "@/features/mission/missionApi";
import useUserSelector from "@/features/user/useUserSelector";
import { EventBus } from "@/utils/eventBus";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./Setup.css";

const Setup = ({ children }) => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [alias, setAlias] = useState("maycol.elcorrobarrutia@apuestatotal.com");
  const [password, setPassword] = useState("Password_123");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    login({
      alias,
      password,
    })
      .unwrap()
      .then((user) => {
        dispatch(setUser(user?.user));
        setIsLoading(false);
      });
  };

  return (
    <>
      <header className="header">
        <Input
          className="header_input header_input--email"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          type="email"
          label="Email"
          size="sm"
        />
        <Input
          className="header_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          size="sm"
        />
        <Button
          onClick={handleLogin}
          className="header__btn_login"
          color="primary"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Login staging calimaco
        </Button>
      </header>
      {children}
    </>
  );
};

export default Setup;
