"""add long_description to exams

Revision ID: 4facd1160261
Revises: 
Create Date: 2019-08-05 21:41:15.193809

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4facd1160261'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam description'))


def downgrade():
    pass
