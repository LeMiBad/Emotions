import { ErrorNotification } from "../../components/Notifications/Notifications";
import { createDomain } from "effector";

const DEFAULT_ERROR_MESSAGE = "Произошла ошибка";

export const domain = createDomain();

domain.onCreateEffect((effect) => {
  effect.fail.watch(({ error }: { error: any }) =>
    ErrorNotification(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE)
  );
});
