from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Customer Unique ID
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    company = db.Column(db.String(80))
    role = db.Column(db.String(20), nullable=False)  # DSA or Borrower
    national_id = db.Column(db.String(20), unique=True, nullable=False)

# Product model
class Product(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(120), nullable=False)
    principal_amount = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    loan_term = db.Column(db.Integer, nullable=False)  # In months
    repayment_schedule = db.Column(db.String(100), nullable=False)
    collateral = db.Column(db.String(255), nullable=True)
    loan_type = db.Column(db.String(50), nullable=False)
    fees_and_charges = db.Column(db.Float, nullable=False)
    credit_score_requirements = db.Column(db.Integer, nullable=False)
    grace_period = db.Column(db.Integer, nullable=False)  # In months
    loan_covenants = db.Column(db.Text, nullable=True)
    workflow_configuration_path = db.Column(db.String(255), nullable=True)
    company = db.Column(db.String(255), nullable=False)

# DSA model
class DSA(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    company_name = db.Column(db.String(120), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable=False)

# Borrower model
class Borrower(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    company_name = db.Column(db.String(120), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable=False)
    details_filled_by_borrowers = db.Column(db.Text, nullable=True)  # JSON stringified
    paths_to_documents = db.Column(db.Text, nullable=True)
    principal_amount = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    loan_term = db.Column(db.Integer, nullable=False)  # In months
    repayment_schedule = db.Column(db.String(100), nullable=False)
    collateral = db.Column(db.String(255), nullable=True)
    loan_type = db.Column(db.String(50), nullable=False)
    fees_and_charges = db.Column(db.Float, nullable=False)
    credit_score = db.Column(db.Integer, nullable=False)
    grace_period = db.Column(db.Integer, nullable=False)  # In months
    loan_covenants = db.Column(db.Text, nullable=True)
