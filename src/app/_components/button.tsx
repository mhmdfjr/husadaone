import clsx from "clsx";

// Pass props of 'variant' and 'size' to use Button COmponent

export default function Button(props:any) {
    const baseStyle = {
        baseButton: ['w-[194px]', 'h-11', 'bg-brand-base', 'flex', 'justify-center', 'items-center', 'rounded-lg'],
        baseText: ['text-basic-white, text-body-bold']
    }
    // console.log(props.size);
    return (
        <div className={clsx(baseStyle.baseButton, {'border-[2px] border-brand-base bg-transparent' : props.variant=='secondary', 'w-[118px]' : props.size=='small'})}>
            <p className={clsx(baseStyle.baseText, {'text-brand-base' : props.variant=='secondary'})}>{props.text}</p>
        </div>
    )
}