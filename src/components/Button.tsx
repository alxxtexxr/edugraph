import { useState, useEffect, ButtonHTMLAttributes, } from 'react';
import classNames from 'classnames';

type Props = {
    bgColor?: string,
    bgColorOn?: string,
    textColor?: string,
    textColorOn?: string,
    w?: number | string,
    h?: number | string,
    borderR?: string,
    borderW?: number | string,
    borderColor?: string,
    shadow?: string,
    center?: boolean,
    isPing?: boolean,
};

const Button = ({
    children,
    bgColor = 'gradient-to-tl from-blue-500 to-blue-400',
    bgColorOn = 'gradient-to-tl from-blue-600 to-blue-500',
    textColor = 'white',
    textColorOn = 'white',
    w = 'full',
    h = 12,
    borderR = 'full',
    borderW = 0,
    borderColor = 'current',
    shadow = 'none',
    center = false,
    isPing = false,
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const [bgColorOnClassNames, setBgColorOnClassNames] = useState({
        [`active:bg-${bgColorOn}`]: !!bgColorOn,
        [`hover:bg-${bgColorOn}`]: !!bgColorOn,
    });

    useEffect(() => {
        const bgColorOnArr = bgColorOn.split(' ');

        if (bgColorOnArr.length > 1) {
            setBgColorOnClassNames(bgColorOnArr.reduce((obj, item, i) => ({
                ...obj,
                [i ? 'hover:' + item : 'hover:bg-' + item]: !!item,
                [i ? 'active:' + item : 'active:bg-' + item]: !!item,
            }), {}));
        }
    }, [bgColorOn]);

    return (
        <button
            className={classNames('relative font-extrabold focus:outline-none hover:border-transparent transition duration-300', {
                ...bgColorOnClassNames,
                'flex justify-center items-center': center,
                [`w-${w}`]: !!w,
                [`h-${h}`]: !!h,
                [`bg-${bgColor}`]: !!bgColor,
                [`text-${textColor}`]: !!textColor,
                [`active:text-${textColorOn}`]: !!textColorOn,
                [`hover:text-${textColorOn}`]: !!textColorOn,
                [`rounded-${borderR}`]: !!borderR,
                [`border-${borderW}`]: !!borderW,
                [`border-${borderColor}`]: !!borderColor,
                [`shadow-${shadow}`]: !!shadow,
            })}
            {...props}
        >
            {isPing && (
                <span className={classNames('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', {
                    [`bg-${bgColor}`]: !!bgColor,
                })} />
            )}
            {isPing ? (
                <span className="relative z-10">{children}</span>
            ) : children}
        </button>
    );
};

export default Button;