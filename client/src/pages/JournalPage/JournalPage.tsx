import b_ from 'b_';
import { useStore } from 'effector-react';
import * as faceapi from 'face-api.js';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import bg2 from '../../assets/icons/bg2.png';
import button from '../../assets/icons/button.png';
import buttonCr from '../../assets/icons/buttonCr.png';
import { AboutEmotionSection } from '../../components/AboutEmotionSection/AboutEmotionSection';
import { AnlyticsSection } from '../../components/AnlyticsSection/AnlyticsSection';
import { getEmotions, postEmotions } from '../../store/emotions';
import { $uuid } from '../../store/uuid';

import './JournalPage.scss';

const b = b_.with('journal-page');

export const JournalPage = () => {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [videoLoaded, setVideoLoaded] = React.useState(false);
    const [values, setValues] = React.useState({});

    const isAuth = Boolean(useStore($uuid));
    const history = useHistory();

    const videoRef = React.useRef();
    const videoHeight = 300;
    const videoWidth = 300;
    const canvasRef = React.useRef();

    useEffect(() => {
        if (!isAuth) {
            history.push('/');
        } else {
            getEmotions();
        }
    }, [history, isAuth]);

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                //@ts-ignore
            ]).then(setModelsLoaded(true));
        };
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                //@ts-ignore
                video.srcObject = stream;
                //@ts-ignore
                video.play();
            })
            .catch((err) => {
                console.error('error:', err);
            });
    };

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                //@ts-ignore
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    //@ts-ignore
                    videoRef.current,
                );
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi
                    .detectAllFaces(
                        //@ts-ignore
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions(),
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();

                detections.forEach(function (e) {
                    const sorted = [
                        'neutral',
                        'happy',
                        'sad',
                        'angry',
                        'fearful',
                        'disgusted',
                        'surprised',
                    ]
                        .map(function (expression) {
                            return {
                                expression: expression,
                                //@ts-ignore
                                probability: e.expressions[expression],
                            };
                        })
                        .sort(function (e0, e1) {
                            //@ts-ignore
                            return e1.probability - e0.probability;
                        }) as Array<any>;

                    //@ts-ignore
                    const resultsToDisplay = sorted.filter(function (expr) {
                        return expr.probability > 0.1;
                    });

                    resultsToDisplay.map(function (expr) {
                        setValues((v) => {
                            return {
                                ...v,
                                [expr.expression]:
                                    //@ts-ignore
                                    (v?.[expr.expression] ?? 0) + 1,
                            };
                        });
                        setValues((v) => ({
                            ...v,

                            //@ts-ignore
                            ['surprise']: v.surprised ?? 0,
                        }));
                        setValues((v) => ({
                            ...v,
                            //@ts-ignore
                            ['fear']: v.fearful ?? 0,
                        }));
                    });
                });

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize,
                );

                canvasRef &&
                    canvasRef.current &&
                    canvasRef.current
                        //@ts-ignore
                        .getContext('2d')
                        .clearRect(0, 0, videoWidth, videoHeight);
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawDetections(
                        canvasRef.current,
                        resizedDetections,
                    );
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawFaceLandmarks(
                        canvasRef.current,
                        resizedDetections,
                    );
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawFaceExpressions(
                        canvasRef.current,
                        resizedDetections,
                    );
            }
        }, 1000);
    };

    const closeWebcam = () => {
        //@ts-ignore
        videoRef.current.pause();
        //@ts-ignore
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);

        postEmotions(values as any);

        setVideoLoaded(true);
    };

    return (
        <section
            style={{ background: `url(${bg2}) center center/cover no-repeat` }}
            className={b()}
        >
            <div>
                <h1 className={b('h1')}>Запечатлите свою эмоцию</h1>
                {captureVideo ? (
                    modelsLoaded ? (
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '10px',
                                }}
                            >
                                <video
                                    //@ts-ignore
                                    ref={videoRef}
                                    height={videoHeight}
                                    width={videoWidth}
                                    onPlay={handleVideoOnPlay}
                                    style={{ borderRadius: '10px' }}
                                />
                                <canvas
                                    //@ts-ignore
                                    ref={canvasRef}
                                    style={{ position: 'absolute' }}
                                />
                            </div>
                            <button onClick={closeWebcam} className={b('btnz')}>
                                Завершить снимать
                            </button>
                        </div>
                    ) : (
                        <div>loading...</div>
                    )
                ) : (
                    <div className={b('wrapper')}>
                        <div
                            style={{
                                background: `url(${button}) center center/cover no-repeat`,
                                height: '500px',
                            }}
                        ></div>
                        <div
                            style={{
                                background: `url(${buttonCr}) center center/cover no-repeat`,
                            }}
                            onClick={startVideo}
                            className={b('btn')}
                        ></div>
                    </div>
                )}

                <h3 className={b('h3')}>
                    Мы определим ее и покажем по ней статистику, а также поможем
                    детально узнать себя, свои эмоции и научим управлять ими
                </h3>
            </div>
            <AnlyticsSection />
            {videoLoaded && <AboutEmotionSection values={values} />}
        </section>
    );
};
