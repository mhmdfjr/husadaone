import clsx from "clsx";

// Pass props of 'text', 'variant', and 'size' to use Button Component

export default function Button(props:any) {
    const baseStyle = {
        baseButton: ['h-11', 'bg-brand-base', 'flex', 'justify-center', 'items-center', 'rounded-lg'],
        baseText: ['text-basic-white', 'text-body-bold']
    }
    console.log(props.size);
    return (
        <div className={clsx(baseStyle.baseButton, {'border-[2px] border-brand-base bg-transparent' : props.variant=='secondary', 'w-[118px]' : props.size=='small', 'w-[194px]' : props.size=='big'})}>
            <p className={clsx(baseStyle.baseText, {'text-brand-base' : props.variant=='secondary'})}>{props.text}</p>
        </div>
    )
}