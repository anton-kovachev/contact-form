from typing import Dict, Any
from config import db

class Contact(db.Model):
    """
    Contact model representing a contact entry in the database.

    Attributes:
        id (int): Primary key for the contact.
        first_name (str): First name of the contact.
        last_name (str): Last name of the contact.
        address (str): Address of the contact.
        phone_number (str): Phone number of the contact (optional).
        email (str): Email address of the contact.
    """
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(50), nullable=False)

    def to_json(self) -> Dict[str, Any]:
        """
        Convert the Contact instance to a JSON-serializable dictionary.

        Returns:
            Dict[str, Any]: Dictionary containing contact details.
        """
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'address': self.address,
            'phoneNumber': self.phone_number,
            'email': self.email}