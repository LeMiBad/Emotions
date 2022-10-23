import b_ from "b_";
import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { BaseInput } from "../../components/BaseInput/BaseInput";
import { postPassword } from "../../store/register";
import { $uuid } from "../../store/uuid";

import "./RegisterPage.scss";

export const b = b_.with("register-page");

export const RegisterPage = () => {
  const history = useHistory();
  const isUUID = Boolean(useStore($uuid));
  const [login, setLogin] = useState("");

  useEffect(() => {
    if (isUUID) {
      history.push("/");
    }   
  }, [isUUID]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPassword(login);
  };

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
