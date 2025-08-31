import { useState, useEffect } from "react";

import "./App.css";
import { Contacts } from "./Contacts";
import { ContactForm } from "./ContactForm";

function App() {
  const BASE_API_URL = "http://localhost:5000/contacts";
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async function () {
    const response = await fetch(BASE_API_URL);
    const contactsData = await response.json();
    setContacts(contactsData.contacts);
  };

  const addOrUpdateContact = async function (contact) {
    try {
      let response = null;
      if (!selectedContact?.id) {
        response = await fetch(BASE_API_URL, {
          headers: { "content-type": "application/json" },
          body: JSON.stringify(contact),
          method: "POST",
        });
      } else {
        response = await fetch(`${BASE_API_URL}\\${selectedContact.id}`, {
          headers: { "content-type": "application/json" },
          body: JSON.stringify(contact),
          method: "PUT",
        });
      }

      setSelectedContact(null);
      if (response.status > 299) {
        const err = await response.json();
        alert(err.error);
      } else {
        await fetchContacts();
      }
    } catch (e) {
      alert(e);
    }
  };

  const deleteContact = async function (contactId) {
    const response = await fetch(`${BASE_API_URL}\\${contactId}`, {
      method: "DELETE",
    });

    if (response.status > 299) {
      const err = await response.json();
      alert(err.error);
    } else {
      alert("Contact deleted successfully");
      await fetchContacts();
    }
  };

  const selectContact = function (contact) {
    setSelectedContact(contact);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div className="card">
        <Contacts
          contacts={contacts}
          setSelectedContact={selectContact}
          deleteContact={deleteContact}
        >
          Contact List
        </Contacts>
        <p>
          <button onClick={() => setSelectedContact({})}>Add Contact</button>
        </p>
      </div>
      <div
        id="myModal"
        class="modal"
        style={{ display: selectedContact ? "block" : "none" }}
      >
        <div class="modal-content">
          <span class="close" onClick={(e) => setSelectedContact(null)}>
            &times;
          </span>
          <div className="card">
            <ContactForm contact={selectedContact} addOrUpdateContact={addOrUpdateContact}>
              {selectedContact?.id ? (
                <h2>Edit Contact</h2>
              ) : (
                <h2>Create Contact</h2>
              )}
            </ContactForm>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
