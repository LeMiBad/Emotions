import b_ from 'b_';
import { useStore } from 'effector-react';

import { $emotions } from '../../store/emotions';
import hexagon from '../../assets/icons/hexagon.png'
import dot from '../../assets/icons/dot.png'

import './Hexagon.scss';

// все в процентах
interface Dot {
    x: number;
    y: number;
}

const getCentralDot = () => ({ x: 50, y: 50 });

const sin30 = 0.5;

const halfLength = 50;

const emotionalFuncs = {
    'angryhappy': (angry: number, happy: number) => {
        const dot = getCentralDot();
        const koef = (angry - happy) / (angry + happy);
        dot.x += halfLength * koef;
        dot.y += halfLength * -koef * sin30;
        return dot;
    },
    'sadsurprise': (sad: number, surprise: number) => {
        const dot = getCentralDot();
        const koef = (surprise - sad) / (surprise + sad);
        dot.x += halfLength * koef;
        dot.y += halfLength * koef * sin30;
        return dot;
    },
    'fearneutral': (fear: number, neutral: number) => {
        const dot = getCentralDot();
        const koef = (fear - neutral) / (fear + neutral);
        dot.y += halfLength * koef;
        return dot
    }
}

const findDeterminant = (matrix: number[][]) => {
    const n = matrix.length;

    const v11 = matrix[0][0];
    const v12 = matrix[0][1];
    const v13 = matrix[0][2];

    const v21 = matrix[1][0];
    const v22 = matrix[1][1];
    const v23 = matrix[1][2];

    const v31 = matrix[2][0];
    const v32 = matrix[2][1];
    const v33 = matrix[2][2];

    return v11 * (v22 * v33 - v23 * v32) - v12 * (v21 * v33 - v23 * v31) + v13 * (v21 * v32 - v22 * v31);
}

const findCenter = (dot1: Dot, dot2: Dot, dot3: Dot) => {
    const rowForX = (dot: Dot) => ([dot.x ** 2 + dot.y ** 2, dot.y, 1]);
    const rowForY = (dot: Dot) => ([dot.x ** 2 + dot.y ** 2, dot.x, 1]);
    const rowForD = (dot: Dot) => ([dot.x, dot.y, 1]);

    const xM = [rowForX(dot1), rowForX(dot2), rowForX(dot3)];
    const yM = [rowForY(dot1), rowForY(dot2), rowForY(dot3)];
    const dM = [rowForD(dot1), rowForD(dot2), rowForD(dot3)];

    const d = findDeterminant(dM) * 2;
    const x = findDeterminant(xM) * (1 / d);
    const y = findDeterminant(yM) * (-1 / d);

    return { x, y };
}

const getPos = (dot: Dot) => ({ left: `${dot.x}%`, top: `${dot.y}%` });;

export const b = b_.with('hexagon');

// далее править на канвас, каждый угол просчитывать координаты и пермещать едиственную центральную точку с учетом градусного угла
export const Hexagon = () => {
    const emotions = useStore($emotions);

    // обьединили disgust and fear
    const angry = emotions?.angry || 1;
    const fear = emotions?.fear || 1;
    const sad = emotions?.sad || 1;
    const happy = emotions?.happy || 1;
    const neutral = emotions?.neutral || 1;
    const surprise = emotions?.surprise || 1;

    const dot1 = emotionalFuncs['angryhappy'](angry, happy);
    const dot2 = emotionalFuncs['sadsurprise'](sad, surprise);
    const dot3 = emotionalFuncs['fearneutral'](fear, neutral);

    const centralX = (dot1.x + dot2.x + dot3.x) / 3
    const centralY = (dot1.y + dot2.y + dot3.y) / 3
    const centralDot = { x: centralX, y: centralY };

    return <div className={b()}>
        <div className={b('content')}>
            <div className={b('background')}>
                <img src={hexagon}  alt='' />
            </div>
            <div className={b('dot-wrapper')} style={getPos(centralDot)}>
                <img src={dot}  alt='' />
            </div>

            <span className={b('text', { neutral: true })}>Спокойствие</span>
            <span className={b('text', { angry: true })}>Злость</span>
            <span className={b('text', { surprise: true })}>Удивление</span>
            <span className={b('text', { fear: true })}>Страх</span>
            <span className={b('text', { happy: true })}>Радость</span>
            <span className={b('text', { sad: true })}>Грусть</span>
        </div>
    </div>;
};
