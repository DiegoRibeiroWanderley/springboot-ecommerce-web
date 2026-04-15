import { useState } from "react";
import Spinner from "../shared/Spinner";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import AddressList from "./AddressList";
import { useDispatch, useSelector } from "react-redux";
import AddressDeleteModal from "./AddressDeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/actions";

const AddressInfo = ({ addresses }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal),
    );
  };

  const noAddressExist = !addresses;
  const { isLoading } = useSelector((state) => state.errors);

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="text-slate-900 text-center font-semibold text-2xl mb-2">
            No address added yet
          </h1>
          <p className="text-slate-800 text-center mb-6">
            Please add your address to complete purchase
          </p>

          <button
            className="px-4 py-2 bg-pink-300 text-white font-medium rounded hover:bg-pink-400 transition-all"
            onClick={addNewAddressHandler}
          >
            Add address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>

          {isLoading ? (
            <div className="justify-center mt-40 ml-11">
              <Spinner size={300} />
            </div>
          ) : (
            <>
              <div>
                <AddressList
                  addresses={addresses}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>

              {addresses.length > 0 && (
                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-pink-300 text-white font-medium rounded hover:bg-pink-400 transition-all"
                    onClick={addNewAddressHandler}
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <AddressDeleteModal
        open={openDeleteModal}
        loader={isLoading}
        setOpen={setOpenDeleteModal}
        title="Delete address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
