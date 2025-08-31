export const ContactForm = function ({ contact, addOrUpdateContact, children }) {
  const addOrUpdate = (formData) => {
    console.log(formData);
    const newContact = Object.fromEntries(formData);
    addOrUpdateContact(newContact);
  };

  return (
    <>
      <div>{children}</div>
      <form action={addOrUpdate}>
        <p>
          <label htmlFor="firstName"></label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            defaultValue={contact?.firstName}
          />
        </p>
        <p>
          <label htmlFor="lastName"></label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            defaultValue={contact?.lastName}
          />
        </p>
        <p>
          <label htmlFor="address"></label>
          <input
            id="address"
            name="address"
            placeholder="Enter Address"
            defaultValue={contact?.address}
          />
        </p>
        <p>
          <label htmlFor="phoneNumber"></label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            defaultValue={contact?.phoneNumber}
          />
        </p>
        <p>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            defaultValue={contact?.email}
          />
        </p>
        <p>
          <input type="submit" value="Save" />
        </p>
      </form>
    </>
  );
};
