import React, {useRef, useState} from "react";
import useDebounce from "./useDebounce";
import {KEYBOARD_KEYS} from "../constants/KeyCodes";

interface IAutoCompleteProps {
    delay: number;
    filter: (searchValue: string) => string[] | Promise<string[]>,
}


export default function useAutoComplition({ delay, filter }: IAutoCompleteProps) {
    const [inputValue, setInputValue] = useState('');
    const [proposals, setProposals] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const proposalListRef = useRef<HTMLUListElement>(null)


    const updateProposals = async (value: string) => {
        if(value) {
            const proposals = await filter(value);

           setProposals(proposals);
        }
    }

    const debouncedUpdateProposals = useDebounce((inputValue: string) => {
        clearProposals();
        updateProposals(inputValue);
        setIsLoading(false);
    }, delay);

    const clearProposals = () => {
        setProposals([]);
    }

    const onInputChange = (value: string) => {
        setIsLoading(true);
        setInputValue(value);
        debouncedUpdateProposals(value);
    }

    const onProposalClick = (index: number) => {
        if(index > -1) {
            setInputValue(proposals[index]);
            clearProposals();
        }
    }

    const proposalElementHeight = proposalListRef.current?.children[0]?.clientHeight;

    const scrollUp = () => {
        if (activeItemIndex > 0) {
            setActiveItemIndex(activeItemIndex - 1)
        }

        if(proposalElementHeight !== undefined && proposalListRef.current) {
            proposalListRef.current.scrollTop -= proposalElementHeight;
        }
    }


    const scrollDown = () => {
        if (activeItemIndex < proposals.length - 1) {
            setActiveItemIndex(activeItemIndex + 1);
        }

        if(proposalElementHeight !== undefined && proposalListRef.current) {
            proposalListRef.current.scrollTop = activeItemIndex * proposalElementHeight;
        }
    }


    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyOperation = {
            [KEYBOARD_KEYS.ArrowDown]: scrollDown,
            [KEYBOARD_KEYS.ArrowUp]: scrollUp,
            [KEYBOARD_KEYS.Enter]: () => onProposalClick(activeItemIndex),
        } as {[index: string]: () => void}

        if (keyOperation[e.key]) {
            keyOperation[e.key]()
        } else {
            setActiveItemIndex(-1)
        }
    }


    return {
        getInputProps: () => ({
            value: inputValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value),
            onKeyDown,
            type: 'search'
        }),
        getProposalProps: (index: number) => ({
            onClick: () => onProposalClick(index),
            className: `display-flex ${index === activeItemIndex ? 'active' : ''}`
        }),
        proposals,
        isLoading,
        proposalListRef,
    }
}