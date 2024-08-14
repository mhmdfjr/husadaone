import clsx from "clsx";

// Pass props of 'label', 'variant', and 'size' to use Button Component

export default function Button(props:any) {
    const baseStyle = {
        baseButton: ['w-[118px]','h-11', 'bg-brand-base', 'flex', 'justify-center', 'items-center', 'rounded-lg', 'cursor-pointer'],
        baseText: ['text-basic-white', 'text-body-bold']
    }
    
    return (
        <div className={clsx(baseStyle.baseButton, {'border-[2px] border-brand-base bg-transparent' : props.variant=='secondary', 'w-[194px]' : props.size=='big'})}>
            <p className={clsx(baseStyle.baseText, {'text-brand-base' : props.variant=='secondary'})}>{props.label}</p>
        </div>
    )
}