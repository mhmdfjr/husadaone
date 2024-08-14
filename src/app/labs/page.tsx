import Button from "@/app/components/button"

// Labs to develop UI components

export default function Labs() {
    return (
            <div className="w-full flex justify-center items-center gap-5">
                    <Button label='Daftar' variant='secondary' size='big' />
                    <Button label='Masuk' variant='primary' size='big' />
                    <Button label='Batal' variant='secondary' size='small' />
                    <Button label='Simpan' variant='primary' size='small' />
            </div>
       
    )
}