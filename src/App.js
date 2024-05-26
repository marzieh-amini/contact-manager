import { useEffect, useState } from "react";
import {
  COMMENT,
  YELLOW,
  PURPLE,
  CURRENTLINE,
  FOREGROUND,
  RED,
} from "./helpers/colors";
import {
  Navbar,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactsServices";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/contactContext";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    //get all info from server
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contacts } = await getAllContacts();
        const { data: groups } = await getAllGroups();
        setContacts(contacts);
        setFilteredContacts(contacts);
        setGroups(groups);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);

      if (status === 201) {
        //add a new contact to state
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setLoading((prevLoading) => !prevLoading);
        navigator("/");
        toast.success("مخاطب با موفقیت اضافه شد.");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      setLoading(true);
      const changeContact = contacts.filter(
        (c) => c.id !== parseInt(contactId)
      );
      //remove to state before send to server
      setContacts(changeContact);
      setFilteredContacts(changeContact);
      const { status } = await deleteContact(contactId);
      if (status !== 200) {
        //if has error set all contact to state
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        toast.error("خطایی رخ داده است. مجددا تلاش کنید");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("مخاطب با موفقیت پاک شد.");
      }
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
      setLoading(false);
    }
  };
  const deleteContactAlert = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئن هستید که میخواهید مخاطب <span className="fw-bold" style={{color:RED}}>{contactFullname}</span> را پاک کنید ؟
            </p>
           <div className="text-start pt-3">
           <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
           </div>
          </div>
        );
      },
    });
  };
 
  const searchContact = _.debounce((query) => {
    if (!query) return setFilteredContacts(contacts);
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
 
  }, 1000);
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        filteredContacts,
        setFilteredContacts,
        contacts,
        groups,
        deleteContact: deleteContactAlert,
        createContact: createContactForm,
        searchContact,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} theme="dark" autoClose={2000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
