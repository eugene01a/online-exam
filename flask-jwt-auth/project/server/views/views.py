# project/project/auth/views.py
from datetime import datetime

from flask import Blueprint
from flask import make_response, jsonify
from flask import request
from flask_login import login_required
from flask_user import roles_required
from project.server import bcrypt, db
from project.server.email import send_password_reset_email
from project.server.models.models import BlacklistToken, Registration, User

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/auth/register', methods=["POST"])
def register():
    # get the post data
    post_data = request.get_json()
    # check if user already exists
    registration = Registration.query.filter_by(email=post_data.get('email')).first()

    if registration:
        if registration.approved_on:
            return make_response(
                jsonify({'message': 'User already exists. Please Log in.',
                         'status': 'fail'})), 400
        else:
            return make_response(
                jsonify({'message': 'Already awaiting admin approval. Please be patient.',
                         'status': 'fail'})), 400
    else:
        try:
            # create the registration
            registration = Registration(post_data.get('email'),
                                        post_data.get('first_name'),
                                        post_data.get('last_name'),
                                        post_data.get('reason'))

            db.session.add(registration)
            db.session.commit()
            return make_response(
                jsonify({'message': 'You will receive an email notification once approved.',
                         'registration_id': registration.id,
                         'status': 'success'})), 200

        except Exception as e:
            print(e)
            return make_response(jsonify({'message': 'Unknown error submitting registration.',
                                          'status': 'fail'})), 500

@auth_blueprint.route('/auth/login', methods=["POST"])
def login():
    # get the post data
    post_data = request.get_json()
    print(post_data)
    try:
        registration = Registration.query.filter_by(email=post_data.get('email')).first()
        if registration:
            print(registration.id)
            user = User.query.filter_by(id=registration.id).first()
            if user:
                if bcrypt.check_password_hash(user.password, post_data.get('password')):
                    auth_token = user.encode_auth_token(user.id)
                    print(auth_token)
                    return make_response(jsonify({
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token.decode(),
                        'status': 'success', })), 200
        else:
            return make_response(jsonify({
                'status': 'fail',
                'message': 'User does not exist.'
            })), 400

    except Exception as e:
        print(e)
        return make_response(jsonify({
            'message': 'Unknown error logging in.',
            'status': 'fail'
        })), 500

@auth_blueprint.route('/auth/approve', methods=["POST"])
@roles_required('Admin')
def approve():
    # get the post data
    post_data = request.get_json()
    # check if user already exists
    registration = Registration.query.filter_by(id=post_data.get('registration_id').first())

    if registration:
        user = User.query.filter_by(email=post_data.get(registration.email)).first()
        if user:
            message = 'User already exists.'
        elif registration.approved_on:
            message = 'Registration already approved.'
        else:
            try:
                registration.approved_on = datetime.now()
                user = User()
                # approve the registration
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'registration_id': registration.id,
                    'email': registration.email,
                    'message': 'Awaiting user password ceration'
                }
                return make_response(jsonify(responseObject)), 201
            except Exception:
                message = 'Some error occurred. Please try again.'
    else:
        message = 'Some error occurred. Please try again.'

    responseObject = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(responseObject)), 401

@auth_blueprint.route('/auth/reset_password_request', methods=["POST"])
def request_reset_password():
    '''
    sends password reset link to a user's email address
    '''

    post_data = request.get_json()
    user = User.query.filter_by(email=post_data.get('email')).first()
    if user:
        try:
            send_password_reset_email(user)
            responseObject = {
                'status': 'success',
                'message': 'Check your email for the instructions to reset your password',
            }
            return make_response(jsonify(responseObject)), 200
        except Exception:
            message = 'Some error occurred. Please try again.'
    else:
        message = 'No user found for provided email.'

    responseObject = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(responseObject)), 401

@auth_blueprint.route('/auth/reset_password', methods=["POST"])
def reset_password():
    token = request.args.get('token')
    user = User.verify_reset_password_token(token)
    if user:
        try:
            user.password = datetime.now()
            # approve the registration
            db.session.commit()
            responseObject = {
                'status': 'success',
                'message': 'Your password has been reset.',
            }
            return make_response(jsonify(responseObject)), 200
        except Exception:
            message = 'Some error occurred. Please try again.'
    else:
        message = 'No user found for provided email.'

    responseObject = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(responseObject)), 401


@login_required
@auth_blueprint.route('/auth/logout', methods=["POST"])
def logout():
    # get auth token
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            # mark the token as blacklisted
            blacklist_token = BlacklistToken(token=auth_token)
            try:
                # insert the token
                db.session.add(blacklist_token)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                return make_response(jsonify(responseObject)), 200
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return make_response(jsonify(responseObject)), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403
