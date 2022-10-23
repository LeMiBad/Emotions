import b_ from "b_";
import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { BaseInput } from "../../components/BaseInput/BaseInput";
import { postLogin } from "../../store/login";
import { $uuid } from "../../store/uuid";

import "./LoginPage.scss";

export const b = b_.with("login-page");

export const LoginPage = () => {
  const history = useHistory();
  const isUUID = Boolean(useStore($uuid));
  const [login, setLogin] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postLogin(login);
  };

  useEffect(() => {
    if (isUUID) {
      history.push("/");
    }
  }, [isUUID]);

  return (
    <form onSubmit={handleSubmit} className={b()}>
      <BaseInput
        name="login"
        placeholder="login"
        value={login}
        onChange={setLogin}
      />
      <BaseButton />
    </form>
  );
};
