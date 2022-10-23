import { saveUUID } from "./../uuid/init";
import { domain } from "./../domain/state";
import api from "../../api";

export const postLogin = domain.createEffect(async (name: string) => {
  const {
    data: { token },
  } = await api.postLogin(name);

  saveUUID(token);

  return token;
});
