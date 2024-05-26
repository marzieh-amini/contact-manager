import { useContext } from "react";
import { Link } from "react-router-dom";
import { CURRENTLINE, PINK, ORANGE } from "../../helpers/colors";
import { Spinner, Contact } from "../index";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { loading, filteredContacts, deleteContact } =
    useContext(ContactContext);

  return (
    <>
      <section>
        <div className="container">
          <div className="grid">
            <div className="row ">
              <div className="col d-flex align-items-center justify-content-start ">
                <p className="h3">
                  <Link
                    to="/contacts/add"
                    className="btn  m-4"
                    style={{ backgroundColor: PINK }}
                  >
                    افزودن مخاطب جدید
                    <i className="fa fa-plus-circle align-middle me-2"></i>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <div className="container">
            <div className="row">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((c) => (
                  <Contact
                    key={c.id}
                    contact={c}
                    deleteContact={() => deleteContact(c.id, c.fullname)}
                  />
                ))
              ) : (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
                    مخاطب یافت نشد ...
                  </p>
                  <img
                    src={require("../../assets/no-found.gif")}
                    alt="not found"
                    className="w-25"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
