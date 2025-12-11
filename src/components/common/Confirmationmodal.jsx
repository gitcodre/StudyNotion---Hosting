import React, {useRef} from 'react'
import GenericBtn from './GenericBtn'

const Confirmationmodal = ({modalData}) => {
    // text1,text2,btntext1,btntext2,btn1Handler,btn2Handler
    const modalRef = useRef(null);

    // Function to handle clicks outside modal box
    const handleOverlayClick = (e) => {
    // if clicked area is the overlay itself (not the modal box)
    // modalRef.current → the modal box element
    // Kya clicked element mera modal box element hai ?? its 2nd condition
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      modalData.btn2Handler(); // same as cancel
    }
  };
  return (
      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40'
      onClick={handleOverlayClick}>

        {/* Isne Modal Box pr samjho pointer laga diya ref={modalRef} ke tahat */}
        <div
            ref={modalRef} 
            className='bg-richblack-800 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-richblack-5'>
            
            <p className="text-2xl font-semibold mb-2">{modalData.text1}</p>
            <p className="text-richblack-300 mb-6">{modalData.text2}</p>
            {/* Buttons */}
            <div className='flex gap-x-2'>
                <GenericBtn 
                    onclick={modalData.btn1Handler}
                    text={modalData.btntext1}
                    customClasses="bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded-md hover:bg-yellow-100 transition"
                />
                <button onClick={modalData.btn2Handler}
                    className="bg-richblack-600 hover:bg-richblack-500 text-richblack-5 px-4 py-2 rounded-md transition"
                >
                    {modalData.btntext2}
                </button>
            </div>

        </div>

    </div>
  )
}

export default Confirmationmodal