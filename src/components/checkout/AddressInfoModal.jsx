import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
            <div className='px-6 py-6'>
              {children}
            </div>
            <div className='flex justify-end gap-4 absolute right-3 top-3'>
              <button onClick={() => setOpen(false)}>
                <FaTimes className='text-slate-700' size={25}/>
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
  )
}

export default AddressInfoModal