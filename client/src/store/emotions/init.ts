import { createApi } from 'effector';
import { domain } from '../domain/state';

import {
    $emotions,
    $recordedEmotions,
    Emotions,
    emotionsStore,
    defaultRecordedEmotions,
} from './state';
import api from '../../api';

export const getEmotions = domain.createEffect(() => {
    const emotions = api.get<emotionsStore>('/emotion-state');

    return emotions;
});

export const postEmotions = domain.createEffect(async (params: any) => {
    await api.postEmotions(params);
    getEmotions();
});

export const recordedEmotionsEvents = createApi($recordedEmotions, {
    handleEmotionRaise: (emotions, emotion: string) => {
        if (!emotions[emotion]) {
            emotions[emotion] = 0;
        }

        return { ...emotions, [emotion]: emotions[emotion] + 1 };
    },
    clearEmotions: () => defaultRecordedEmotions,
});

$emotions.on(getEmotions.doneData, (_, v) => v);
