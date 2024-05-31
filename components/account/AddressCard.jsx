const AddressCard = ({ addressInfo }) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    country,
    postalCode,
    email,
    mobile,
  } = addressInfo || {};
  return (
    <div className="space-y-1">
      <h4 className="text-gray-700 font-medium text-xl">
        {firstName} {lastName}
      </h4>
      <div className="text-gray-500 text-md">
        <p>{address1}</p>
        {address2 && <p>{address2}</p>}

        <p>
          {city}, {country}, {postalCode}
        </p>

        <p>{email}</p>
        <p>{mobile}</p>
      </div>
    </div>
  );
};

export default AddressCard;
