# project/tests/test_user_model.py

import unittest

from project.server import db
from project.servermodels.user import User
from tests.base import BaseTestCase


class TestUserModel(BaseTestCase):

    def test_encode_auth_token(self):
        user = User(
            registration_id=1,
            password='test_password'
        )

        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        user = User(
            registration_id=1,
            password='test_password'
        )
        db.session.add(user)
        db.session.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))
        self.assertTrue(User.decode_auth_token(
            auth_token.decode("utf-8")) == 1)


if __name__ == '__main__':
    unittest.main()
