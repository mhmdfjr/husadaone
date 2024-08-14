import Button from "@/app/_components/button"

// Labs to develop UI components

export default function Labs() {
    return (
            <div className="w-full flex flex-col items-center gap-y-5">
              
                    <Button text='Daftar' variant='secondary' size='big' />
                    <Button text='Masuk' variant='primary' size='big' />
                    <Button text='Batal' variant='secondary' size='small' />
                    <Button text='Simpan' variant='primary' size='small' />
           
            </div>
       
    )
}