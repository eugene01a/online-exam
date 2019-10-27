# This file defines command line commands for manage.py
#
# Copyright 2014 SolidBuilds.com. All rights reserved
#
# Authors: Ling Thio <ling.thio@gmail.com>

import datetime

from flask_script import Command
from project.server import db
from project.server.models.models import User, Role, Registration


class InitDbCommand(Command):
    """ Initialize the database."""

    def run(self):
        init_db()
        print('Database has been initialized.')


def init_db():
    """ Initialize the database."""
    db.drop_all()
    db.create_all()
    create_users()


def create_users():
    """ Create users """

    # Create all tables
    db.create_all()

    # Adding role
    admin_role = find_or_create_role('Admin')
    user_role = find_or_create_role('User')

    # Add registration
    registration= find_or_create_registration('Eugene', 'Ichinose', u'ichinose.household@gmail.com', 'initial admin')

    # Add user
    admin_user = find_or_create_user(registration.id, 'adminPW', admin_role.id)
    # Save to DB
    db.session.commit()


def find_or_create_role(name):
    """ Find existing role or create new role """
    role = Role.query.filter(Role.name == name).first()
    if not role:
        role = Role(name=name)
        db.session.add(role)
    return role


def find_or_create_registration(first_name, last_name, email, reason):
    """ Find existing user or create new registration """
    registration = Registration.query.filter(Registration.email == email).first()
    if not registration:
        registration = Registration(email=email,
                                    first_name=first_name,
                                    last_name=last_name,
                                    approved_on=datetime.datetime.now(),
                                    reason=reason)
        db.session.add(registration)
        db.session.flush()
    return registration


def find_or_create_user(registration_id, password, role_id):
    """ Find existing user or create new user """

    user = User.query.filter(User.registration_id == registration_id).first()
    if not user:
        user = User(registration_id=registration_id, password=password, role_id=role_id)
        db.session.add(user)
    return user
