import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { getContact, updateContact } from "../../services/contactsServices";
import { ContactContext } from "../../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validations/contactValidations";
import { toast } from "react-toastify";

const EditContact = () => {
  const {
    setLoading,
    loading,
    groups,
    setContacts,
    contacts,
    setFilteredContacts,
  } = useContext(ContactContext);
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  useEffect(() => {
    //get contact data form server
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //function for update Contact
  const submitForm = async (values) => {
    try {
      setLoading(true);
      // send update to server
      const { data, status } = await updateContact(values, contactId);
      if (status) {
        //set data in copy of contacts
        const allContacts = [...contacts];
        const contactEditIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactEditIndex] = { ...data };

        //update contacts in ContactContext
        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setLoading(false);
        toast.success("مخاطب با موفقیت ویرایش شد.");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              {Object.keys(contact).length > 0 ? (
                <div
                  className="row p-2 w-75 mx-auto align-items-center"
                  style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                >
                  <div className="col-md-8">
                    <Formik
                      initialValues={contact}
                      validationSchema={contactSchema}
                      onSubmit={(values) => {
                        submitForm(values);
                      }}
                    >
                      <Form>
                        <div className="mb-2">
                          <Field
                            name="fullname"
                            type="text"
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage
                            name="fullname"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="photo"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />{" "}
                          <ErrorMessage
                            name="photo"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="mobile"
                            type="text"
                            className="form-control"
                            placeholder="شماره موبایل"
                          />
                          <ErrorMessage
                            name="mobile"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2">
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                          />
                          <ErrorMessage
                            name="email"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2">
                          <Field
                            type="text"
                            name="job"
                            className="form-control"
                            placeholder="شغل"
                          />
                          <ErrorMessage
                            name="job"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mb-2">
                          <Field
                            as="select"
                            name="group"
                            className="form-control"
                          >
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage
                            name="group"
                            render={(e) => (
                              <div className="text-danger">{e}</div>
                            )}
                          />
                        </div>
                        <div className="mx-2 text-start">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ویرایش مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn me-2"
                            style={{ backgroundColor: COMMENT }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                  <div className="col-md-4">
                    <img
                      alt={contact.fullname}
                      src={contact.photo}
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="row p-2 w-75 mx-auto align-items-center"
                  style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                >
                  <h2>کاربری با این مشخصات وجود ندارد</h2>
                </div>
              )}
            </div>

            <div className="text-center mt-1">
              <img
                alt="man-taking-note.png"
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default EditContact;
