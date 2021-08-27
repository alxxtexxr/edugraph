import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDoubleRight } from 'react-icons/fa';

// Contexts
import { useAuthContext } from '../contexts/AuthContext';

// Components
import BottomNavbar from './BottomNavbar';
import Photo from './Photo';
import XpBar from './XpBar';
import Slider from './Slider';
import AchievementsItem from './AchievementsItem';

// Types
import AttemptedStage from '../types/AttemptedStage';
import Achievement from '../types/Achievement';
import AcquiredAchievement from '../types/AcquiredAchievement';

type ProfileChartBarProps = {
    bgColor?: string,
    title?: string,
    value?: number,
    width?: string,
};

const ProfileChartBar = ({ bgColor, title, value, width = `${1 / 8 * 100}%`, }: ProfileChartBarProps) => (
    <div className="w-full h-9 relative flex justify-start items-center bg-gray-500 bg-opacity-10 rounded-lg overflow-hidden">
        {bgColor && value && (
            <>
                <div
                    className={`bg-${bgColor} text-white h-full rounded-lg`}
                    style={{
                        width: `${value}%`,
                    }}
                >
                </div>
                {/* <span className={`absolute top-0 font-semibold text-xs text-${value > 90 ? 'white' : 'gray-500'} w-full text-center p-2`}>
                        {value}
                    </span> */}
            </>
        )}
    </div>
);

const Profile = () => {
    // Contexts
    const { user: { name, photo, acquired_achievement_count } } = useAuthContext();

    // States
    const attemptedStages: AttemptedStage[] = [
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'letters',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 80,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'numbers',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 50,
            question_count: 5,
            attempted_questions: []
        },
        {
            stage_id: 1,
            id: 1,
            stage: {
                stage: '1',
                category: 'symbols',
                id: 1,
                question_count: 5,
                questions: [],
                is_locked: false,
            },
            score: 60,
            question_count: 5,
            attempted_questions: []
        },
    ];
    // States
    const [achievements, setAchievements] = useState<(Achievement & { is_locked: boolean })[]>();

    // Effects
    useEffect(() => {
        if (acquired_achievement_count) {
            axios.get(`${process.env.REACT_APP_API_URL}/acquired-achievements?limit=${acquired_achievement_count}`)
                .then((res) => {
                    const acquiredAchievements: AcquiredAchievement[] = res.data;

                    setAchievements([
                        ...(achievements ? achievements : []),
                        ...acquiredAchievements.map((acquiredAchievement) => ({
                            ...acquiredAchievement.achievement,
                            is_locked: acquiredAchievement.progress < 100,
                        })),
                    ]);
                })
                .catch((err) => console.error(err));
        }

        if (!acquired_achievement_count) {
            axios.get(`${process.env.REACT_APP_API_URL}/achievements?limit=${3 - acquired_achievement_count}`)
                .then((res) => {
                    const _achievements: Achievement[] = res.data;

                    setAchievements([
                        ...(achievements ? achievements : []),
                        ..._achievements.map((_achievement) => ({
                            ..._achievement,
                            is_locked: true,
                        }))
                    ])
                })
                .catch((err) => console.error(err));
        }
    }, [acquired_achievement_count])

    return (
        <div className="flex-grow overflow-y-scroll pb-22">
            <header className="text-gray-700 text-center p-8 md:pt-21 md:pb-12">
                <div className="flex justify-center mb-3">
                    <Photo photo={photo} size={24} />
                </div>
                <div className="flex-1">
                    <h1 className="text-xl font-extrabold leading-none active:underline hover:underline mb-4">
                        {name}
                    </h1>
                    <XpBar bgColor="gray-500 bg-opacity-10" />
                </div>
            </header>

            <main>
                {/* Chart */}
                <section className="px-4 mb-4">
                    <div className="bg-white p-6 shadow-default rounded-xl">
                        <h2 className="text-sm font-bold mb-6">Rata-Rata Tes Menulis</h2>
                        <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                            <div className="flex">
                                <div className="bg-red-500 w-3 h-3 rounded-full mr-2" />
                                Alat Tulis
                            </div>
                            <div className="flex">
                                <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
                                Simbol
                            </div>
                            <div className="flex">
                                <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
                                Huruf
                            </div>
                            <div className="flex">
                                <div className="bg-blue-500 w-3 h-3 rounded-full mr-2" />
                                Angka
                            </div>
                        </div>
                        <div className="grid gap-2">
                            {attemptedStages.map(({ id, score, stage }) => {
                                let bgColor = '';

                                switch (stage.category) {
                                    case 'symbols': bgColor = 'gradient-to-tl from-red-500 to-red-400'; break;
                                    case 'letters': bgColor = 'gradient-to-tl from-yellow-500 to-yellow-400'; break;
                                    case 'numbers': bgColor = 'gradient-to-tl from-green-500 to-green-400'; break;
                                    case 'on-paper': bgColor = 'gradient-to-tl from-blue-500 to-blue-400'; break;
                                }

                                return (
                                    <ProfileChartBar
                                        bgColor={bgColor}
                                        value={score}
                                    />
                                );
                            })}
                            {Array.from(Array(4 - attemptedStages.length).keys()).map((i) => (
                                <ProfileChartBar key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="px-4 mb-4">
                    <div className="flex justify-between items-center text-sm mb-4">
                        <h2 className="font-bold leading-none">
                            Penghargaan
                        </h2>
                    </div>
                    <div className="relative -m-1">
                        {achievements ? (
                            <Slider
                                arrowSettings={{
                                    bgColor: 'white',
                                    bgColorOn: 'white',
                                    textColor: 'gray-400',
                                    textColorOn: 'blue-500',
                                }}
                                settings={{
                                    dots: false,
                                    infinite: false,
                                    speed: 500,
                                    responsive: [
                                        {
                                            breakpoint: 1440,
                                            settings: {
                                                slidesToShow: 3,
                                            }
                                        },
                                        {
                                            breakpoint: 768,
                                            settings: {
                                                slidesToShow: 3,
                                            }
                                        },
                                    ],
                                }}
                            >
                                {[...achievements, undefined].map((achievement) => achievement ? (
                                    <div className="p-1" key={achievement.id}>
                                        <AchievementsItem {...achievement} />
                                    </div>
                                ) : (
                                    <div className="p-1">
                                        <div
                                            className="relative text-center w-full px-4 py-6 rounded-lg shadow-default overflow-hidden bg-white text-gray-400">
                                            <div
                                                className="flex justify-center items-center"
                                                style={{
                                                    height: '3.83rem',
                                                }}
                                            >
                                                {/* <div className="inline-flex justify-center items-center border-3 w-12 h-12 rounded-full"> */}
                                                <FaAngleDoubleRight className="inline-flex" size="1.66rem" />
                                                {/* </div> */}
                                            </div>

                                            <h2 className="text-sm font-bold leading-none">
                                                Lihat Lebih <br /> Banyak
                                            </h2>
                                            <div className="absolute -right-8 -bottom-4 bg-white bg-opacity-20 w-24 h-24 rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : null}
                    </div>
                </section>
            </main>

            <BottomNavbar />
        </div >
    );
};

export default Profile;