import {useEffect, useRef} from "react";

export default function useDebounce<A extends any[]>(callback: (...args: A) => unknown, delay: number) {
    const argsRef = useRef<A>();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const cleanup = () => {
        if(timeout.current) {
            clearTimeout(timeout.current);
        }
    }

    useEffect(() => cleanup, []);

    return (
        ...args: A
    ) => {
        argsRef.current = args;
        cleanup();

        timeout.current = setTimeout(() => {
            if(argsRef.current) {
                callback(...argsRef.current);
            }
        }, delay);
    };
}