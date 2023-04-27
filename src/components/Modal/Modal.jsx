import PropTypes from 'prop-types';
import { UilStepBackward, UilTrashAlt } from '@iconscout/react-unicons';

const Modal = ({
  showModal, onCancel, car, onConfirm,
}) => (
  <>
    {showModal && (
    <div className="fade-in fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black/40">
      <div className="bg-white md:w-1/2 w-[90%] md:h-[55vh] h-[60vh] rounded-2xl p-6 ">
        <div className="text-center">
          <h1 className=" font-bold text-xl mb-6">Delete Car?</h1>
          <p>
            Are you sure you want to delete
            {' '}
            <span className="font-bold text-slate-500">
              &quot;
              {car.name ? car.name : car.car_name}
              &quot;
            </span>
            ?
          </p>
          <p className="mt-2">You can&apos;t undo this action.</p>
        </div>
        {car.name && (
        <div className="mt-5 mx-4 px-4 rounded-md bg-amber-50 md:max-w-2xl md:mx-auto md:px-8">
          <div className="py-3">
            <div className="flex">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-amber-600 font-semibold">
                  Warning
                </span>
                <p className="text-amber-600 mt-1 text-[13px]">
                  By deleting this car, you will remove all reservations associated with it.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="flex justify-center gap-5 mt-8">
          <button type="button" className=" bg-slate-500 px-6 py-3 rounded-3xl text-white flex hover:bg-slate-700 duration-150 items-center" onClick={onCancel}>
            cancel
            <UilStepBackward className="ml-3" />
          </button>
          <button type="button" className=" bg-red-600 px-6 py-3 rounded-3xl text-white flex hover:bg-red-800 duration-150 items-center" onClick={onConfirm}>
            delete
            <UilTrashAlt className="ml-3" />
          </button>
        </div>
      </div>
    </div>
    )}
  </>
);

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  car: PropTypes.shape().isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
