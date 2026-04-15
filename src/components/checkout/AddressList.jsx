import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();

  const selectedUserAddress = useSelector(
    (state) => state.auth.selectedUserAddress,
  );

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  return (
    <div className="space-y-4 mt-4">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
          className={`p-4 border-gray-300 border rounded-md cursor-pointer relative ${
            selectedUserAddress?.addressId === address.addressId
              ? "bg-green-100"
              : "bg-white"
          }`}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center">
                <FaBuilding size={14} className="mr-2 text-gray-600" />
                <p className="font-semibold">{address.buildingName}</p>
                {selectedUserAddress?.addressId === address.addressId && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>

              <div className="flex items-center">
                <FaStreetView size={14} className="mr-2 text-gray-600" />
                <p>{address.street}</p>
              </div>

              <div className="flex items-center">
                <MdLocationCity size={14} className="mr-2 text-gray-600" />
                <p>
                  {address.city}, {address.state}, {address.country}
                </p>
              </div>

              <div className="flex items-center">
                <MdPinDrop size={14} className="mr-2 text-gray-600" />
                <p>{address.postalCode}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 absolute top-4 right-2">
            <button onClick={() => onEditButtonHandler(address)}>
              <FaEdit size={18} className="text-teal-700 cursor-pointer" />
            </button>
            <button onClick={() => onDeleteButtonHandler(address)}>
              <FaTrash size={17} className="text-rose-700 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
