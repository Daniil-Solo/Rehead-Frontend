export interface Option {
    name: string
}

export interface SelectProps {
    initialText: string,
    options: Array<Option>,
    currentOption: Option | null,
    setCurrentOption: (option: Option) => void
}
