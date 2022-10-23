import { domain } from '../domain/state';
import { createEffect } from 'effector';

import { $uuid } from './state';

export const getUUID = domain.createEffect(() => {
    return localStorage.getItem('uuid');
});

export const saveUUID = createEffect((uuid: string) => {
    localStorage.setItem('uuid', uuid);

    return uuid;
});

$uuid.on(getUUID.doneData, (_, v) => v);
$uuid.on(saveUUID.doneData, (_, v) => v);

getUUID();

$uuid.watch((e) => {
    console.log(e);
});
