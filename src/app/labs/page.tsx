import Button from "@/app/_components/button"

// Labs to develop UI components

export default function Labs() {
    return (
        <main>
            <div className="">
                <div className="button flex gap-4">
                    <Button text='Daftar' variant='secondary' size='big' />
                    <Button text='Masuk' variant='primary' size='big' />
                    <Button text='Batal' variant='secondary' size='small' />
                    <Button text='Simpan' variant='primary' size='small' />
                </div>
            </div>
        </main>
    )
}