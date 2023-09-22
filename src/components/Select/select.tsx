import {useState} from 'react';
import './select.css';
import {Option, SelectProps} from './types';
import {useClickOutside} from './hooks';


export const Select: React.FC<SelectProps> = ({initialText, options, currentOption, setCurrentOption}) => {
    const [opened, setOpened] = useState(false);
    const selectRef = useClickOutside(() => setOpened(false));

    const selectOption = (option: Option) => {
        setCurrentOption(option);
        setOpened(false);
    }

    return (
        <div className="select" ref={selectRef}>
            <div className="select__header" onClick={() => setOpened(!opened)}>
                <p>{currentOption? initialText + ': ' + currentOption.name: initialText}</p>
                <svg className={opened? 'select__icon_rotated': 'select__icon'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
            <ul className={"select__options options " + (opened? 'select__options_opened': '')}>
                {
                    options?.map(option => 
                        <li key={option?.name} className={'options__item item ' + (currentOption && option.name === currentOption.name? 'item_active': '')} onClick={() => selectOption(option)}> {option?.name}
                        </li>
                    )
                }
            </ul>
        </div>
    )
}