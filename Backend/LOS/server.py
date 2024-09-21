import os
from flask import Flask, request, jsonify, send_from_directory, make_response
from models import db
from controller import init_db, create_user, get_all_users, create_product, get_all_products, create_dsa, create_borrower, get_user_by_email_id, get_product_by_id
import json
app = Flask(__name__, static_folder='/dist')

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///los.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



# Initialize the database
init_db(app)

# API to create a new user
@app.route('/', methods=['GET'])
def home():
    print("called here")
    return "Welcome To LOS"


# API to create a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    create_user(data)
    return jsonify({"message": "User created successfully"}), 201

# API to get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = get_all_users()
    return jsonify([{
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'role': user.role,
        'national_id': user.national_id
    } for user in users]), 200



@app.route('/get_user_by_email/<email>', methods=['GET'])
def get_user_by_email(email):
    user, found_user = get_user_by_email_id(email)
    if found_user:
        return make_response(user), 200
    else:
        return "No users", 404
        
@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user, found_user = get_user_by_email_id(body["email"])
    print("user")
    print(user)
    if found_user:
        if user["password"] == body["password"]:
            data_to_send = {
                "email": user["email"],
                "role": user["role"],
                "company": user["company"] 
            }
            print("data to send")
            print(data_to_send)
            return make_response(data_to_send),200
        else:
            return "Authentication Failed", 404
            
    else:
        return "No users", 404
        
  

# API to create a new product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
   
    product_id = data["product_id"]
    path_json = os.path.join('Storage', f"{product_id}.json")
    empty_configuration= {}
    with open(path_json, "w") as json_fl:
        json.dump(empty_configuration, json_fl)
    data["workflow_configuration_path"] = path_json
    create_product(data)
   
    return jsonify({"message": "Product created successfully"}), 201

# API to get all products
@app.route('/products', methods=['GET'])
def get_products():
    products = get_all_products()
    return jsonify([{
        'product_id': product.product_id,
        'product_name': product.product_name,
        'principal_amount': product.principal_amount,
        'interest_rate': product.interest_rate,
        'loan_term': product.loan_term,
        'repayment_schedule': product.repayment_schedule,
        'collateral': product.collateral,
        'loan_type': product.loan_type,
        'fees_and_charges': product.fees_and_charges,
        'credit_score_requirements': product.credit_score_requirements,
        'grace_period': product.grace_period,
        'loan_covenants': product.loan_covenants,
        'company': product.company,
        'workflow_configuration_path': product.workflow_configuration_path
    } for product in products]), 200



@app.route('/get_product_by_id/<int:id>', methods=['GET'])
def get_product(id):
   resp = get_product_by_id(id)
   return make_response(resp), 200

# API to create a new DSA
@app.route('/dsas', methods=['POST'])
def add_dsa():
    data = request.get_json()
    create_dsa(data)
    return jsonify({"message": "DSA created successfully"}), 201

# API to create a new Borrower
@app.route('/borrowers', methods=['POST'])
def add_borrower():
    data = request.get_json()
    create_borrower(data)
    return jsonify({"message": "Borrower created successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
