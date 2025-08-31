from flask import jsonify, request, abort
from config import app, db
from model import Contact

@app.route('/contacts', methods=['GET'])
def contacts():
    contacts = Contact.query.all()
    return jsonify({ 'contacts': [contact.to_json() for contact in contacts] })
    
@app.route('/contacts', methods=['POST'])
def create_contact():
    data = request.get_json()
    first_name = data.get('firstName')    
    last_name = data.get('lastName')
    address = data.get('address')
    phone_number = data.get('phoneNumber')
    email = data.get('email')
    
    if first_name is None or last_name is None or address is None or email is None:
        return jsonify({ 'error': 'The fields firstName, lastName, address and email are required' }), 404
    
    contact = Contact(first_name = first_name, last_name = last_name, address = address, phone_number = phone_number, email = email )
    db.session.add(contact)
    db.session.commit()
    
    return jsonify(contact.to_json()), 201

@app.route('/contacts/<int:id>', methods=['GET'])
def contact(id):
    contact = Contact.query.get(id)
    if contact is None:
        return jsonify({'error': f'Contact wit id: {id} does not exists'}), 404
    
    return jsonify(contact.to_json()), 200

@app.route('/contacts/<int:id>', methods=['DELETE'])    
def delete_contact(id):
    contact = Contact.query.get(id)
    if contact is None:
        return jsonify({'error': f'Contact wit id: {id} does not exists'}), 404
    
    db.session.delete(contact)
    db.session.commit()
    
    return '', 204

@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get(id)
    if contact is None:
        return jsonify({'error': f'Contact wit id: {id} does not exists'}), 404
   
    contact.first_name = request.json.get('firstName', contact.first_name) 
    contact.last_name = request.json.get('lastName', contact.last_name) 
    contact.address = request.json.get('address', contact.address) 
    contact.phoneNumber = request.json.get('phoneNumber', contact.phone_number) 
    contact.email = request.json.get('email', contact.email) 
    
    db.session.add(contact)
    db.session.commit()
    
    return jsonify(contact.to_json()), 201

if __name__ == '__main__':
    with app.app_context():
       db.create_all() 
    app.run(debug=True)