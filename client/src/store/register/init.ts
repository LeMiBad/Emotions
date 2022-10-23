import { saveUUID } from './../uuid/init';
import { domain } from '../domain/state';
import api from '../../api';

export const postPassword = domain.createEffect(async (name: string) => {
    const {
        data: { token },
    } = await api.postRegister(name);

    await saveUUID(token);

    return token;
});
