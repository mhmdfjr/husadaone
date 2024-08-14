import Button from "@/components/button"

// Labs to develop UI components

export default function Labs() {
    return (
            <div className="w-full flex flex-col items-center gap-5">
                    <div className="flex gap-5">
                        <Button label='Masuk' variant='primary' size='big' />
                        <Button label='Daftar' variant='secondary' size='big' />
                        <Button label='Simpan' variant='primary-disable' size='big' />
                        <Button label='Batal' variant='secondary-disable' size='big' />
                        <Button label='Hapus' variant='disable' size='big' />
                    </div>
                    <div className="flex gap-5"> 
                        <Button label='Masuk' variant='primary' size='small' />
                        <Button label='Daftar' variant='secondary' size='small' />
                        <Button label='Simpan' variant='primary-disable' size='small' />
                        <Button label='Batal' variant='secondary-disable' size='small' />
                        <Button label='Hapus' variant='disable' size='small' />
                    </div>
            </div>
       
    )
}