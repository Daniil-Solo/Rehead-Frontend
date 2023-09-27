export interface CheckboxProps{
    title: string, 
    isChecked: boolean, 
    changeChecked: (e: any) => void,
    className?: string
}