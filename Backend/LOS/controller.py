from models import db, User, Product, DSA, Borrower
import json
from flask import jsonify
def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()

def create_user(data):
    new_user = User(
        email=data['email'],
        password=data['password'],  # You can add password hashing here
        username=data['username'],
        role=data['role'],
        national_id=data['national_id'],
        company = data['company']
    )
    db.session.add(new_user)
    db.session.commit()

def get_all_users():
    return User.query.all()

def create_product(data):
    new_product = Product(
        product_id = data["product_id"],
        product_name=data['product_name'],
        principal_amount=data['principal_amount'],
        interest_rate=data['interest_rate'],
        loan_term=data['loan_term'],
        repayment_schedule=data['repayment_schedule'],
        collateral=data.get('collateral'),
        loan_type=data['loan_type'],
        fees_and_charges=data['fees_and_charges'],
        credit_score_requirements=data['credit_score_requirements'],
        grace_period=data['grace_period'],
        loan_covenants=data.get('loan_covenants'),
        workflow_configuration_path=data.get('workflow_configuration_path'),
        company = data.get('company')
    )
    db.session.add(new_product)
    db.session.commit()

def get_all_products():
    return Product.query.all()

def get_product_by_id(id):
    product = Product.query.get(id)
    if product:
        product_work_flow_path = product.workflow_configuration_path
        work_flow_conf = {}
        with open(product_work_flow_path, "r") as js_fl_rd:
            work_flow_conf = json.load(js_fl_rd)

        product_data = {
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
    }
        product_data["work_flow"] = work_flow_conf
        return product_data
    else:
        return {
            "status": "failed",
            "message": "No Product Found"
        }

def create_dsa(data):
    new_dsa = DSA(
        user_id=data['user_id'],
        company_name=data['company_name'],
        product_id=data['product_id']
    )
    db.session.add(new_dsa)
    db.session.commit()

def create_borrower(data):
    new_borrower = Borrower(
        user_id=data['user_id'],
        company_name=data['company_name'],
        product_id=data['product_id'],
        details_filled_by_borrowers=data.get('details_filled_by_borrowers'),
        paths_to_documents=data.get('paths_to_documents'),
        principal_amount=data['principal_amount'],
        interest_rate=data['interest_rate'],
        loan_term=data['loan_term'],
        repayment_schedule=data['repayment_schedule'],
        collateral=data.get('collateral'),
        loan_type=data['loan_type'],
        fees_and_charges=data['fees_and_charges'],
        credit_score=data['credit_score'],
        grace_period=data['grace_period'],
        loan_covenants=data.get('loan_covenants')
    )
    db.session.add(new_borrower)
    db.session.commit()

def get_user_by_email_id(email):
    user = User.query.filter_by(email=email).first()
    user_found = False
    user_data = {}
    if user:
        user_data = {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'role': user.role,
            'national_id': user.national_id,
            'password': user.password,
            'company': user.company
        }
        user_found = True
    
    return user_data, user_found
    
