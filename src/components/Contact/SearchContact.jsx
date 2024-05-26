import { useContext } from "react";
import { PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";

const SearchContact = () => {
  const { searchContact } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text "
        style={{ backgroundColor: PURPLE }}
        id="basic-addon1"
      >
        <i className="fa fa-search"></i>
      </span>
      <input
        className="form-control"
        onChange={(e) => searchContact(e.target.value)}
        type="text"
        dir="rtl"
        aria-label="search"
        aria-describedby="basic-addon1"
        placeholder="جستجو مخاطبین"
      />
    </div>
  );
};
export default SearchContact;
