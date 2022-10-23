import { domain } from './../domain/state';

export enum Emotions {
    angry = 'angry',
    fear = 'fear',
    happy = 'happy',
    neutral = 'neutral',
    sad = 'sad',
    surprise = 'surprise',
}

export type emotionsStore = Record<Emotions, number>;

export const $emotions = domain.createStore<emotionsStore | null>(null);

export const defaultRecordedEmotions = {
    angry: 0,
    fear: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprise: 0,
}

export const $recordedEmotions = domain.createStore<Record<string, number>>(defaultRecordedEmotions);
