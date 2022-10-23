import b_ from 'b_';
import React from 'react';

import { AboutEmotionSectionType, dataByType } from './data';

import { useStore } from 'effector-react';
import { $emotions, emotionsStore } from '../../store/emotions';

import './AboutEmotionSection.scss';

const getAboutEmotionSectionType = (values: emotionsStore | null) => {
    if (!values) {
        return AboutEmotionSectionType.HAPPY;
    }
    let maxValue = 0,
        maxEmotion = 'neutral';

    Object.keys(values).forEach((emotion) => {
        // @ts-ignore
        if (values[emotion] > maxValue) {
            // @ts-ignore
            maxValue = values[emotion];
            maxEmotion = emotion;
        }
    });

    switch (maxEmotion) {
        case 'angry':
            return AboutEmotionSectionType.ANGRY;
        case 'fear':
            return AboutEmotionSectionType.FEAR;
        case 'happy':
        case 'surprise':
            return AboutEmotionSectionType.HAPPY;
        case 'neutral':
        case 'sad':
            return AboutEmotionSectionType.SAD;
        default:
            return AboutEmotionSectionType.HAPPY;
    }
};

const b = b_.with('about-emotion-section');

export const AboutEmotionSection = ({ values }: { values: any }) => {
    if (!values) {
        return null;
    }

    const type = getAboutEmotionSectionType(values);

    const { title, descriptionParagraphs, imageSrc } = dataByType[type];

    return (
        <section className={b()}>
            <span className={b('title')}>{title}</span>
            <div className={b('img-wrapper')}>
                <img className={b('img')} src={imageSrc} alt="emotion-img" />
            </div>
            <div className={b('paragraphs')}>
                {descriptionParagraphs.map((paragraph) => (
                    <span className={b('paragraph')}>{paragraph}</span>
                ))}
            </div>
        </section>
    );
};
