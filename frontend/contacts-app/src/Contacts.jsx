export const Contacts = function ({ contacts, setSelectedContact, deleteContact, children }) {
  return (
    <>
      <h2>{children}</h2>
      <div>
        {contacts?.length && (
          <ol type="number">
            {contacts.map((c) => (
              <li key={c.id}>
                {c.firstName} {c.lastName} {c.address} {c.email}{" "}
                <button value={c} onClick={(e) => setSelectedContact(c)}>
                  Edit
                </button>
                <button onClick={(e) => deleteContact(c.id)}>Delete</button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};
