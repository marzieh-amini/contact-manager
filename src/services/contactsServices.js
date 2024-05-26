import axios from "axios";

const SERVER_URL = "http://localhost:9000"


//@desc Get all Contacts
//@routes GET http://localhost:9000/contacts
export const getAllContacts = ()=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

//@desc Get contact With ContactId
//@routes GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

//@desc Create New Contact
//@routes POST http://localhost:9000/contacts
export const createContact = (contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact)
}

//@desc update Contact
//@routes PUT http://localhost:9000/contacts/:contactId
export const updateContact = (contact , contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact)
}

//@desc Delete Contact
//@routes DELETE http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url)
}


//@desc Get all Groups
//@routes GET http://localhost:9000/groups
export const getAllGroups = ()=>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}


//@desc Get groups With GroupsId
//@routes GET http://localhost:9000/groups/:groupsId
export const getGroup = (groupId)=>{
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}