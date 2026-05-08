import sys
import os
sys.path.append(os.getcwd())
from app import create_app, db
from app.models.login import User

app = create_app()
with app.app_context():
    # Delete existing test user if needed or just use a different one
    User.query.filter_by(email="test@example.com").delete()
    new_user = User(username="testuser", email="test@example.com", password="password")
    db.session.add(new_user)
    db.session.commit()
    print("Test user created: test@example.com / password")
