import os
from flask_admin import Admin
from .models import db, User, Characters, Planets, Favorites
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get("FLASK_APP_KEY", "sample key")
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"
    admin = Admin(app, name="4Geeks Admin", template_mode="bootstrap3")

    class FavoriteView(ModelView):
        column_list = {"id", "user_id", "characters_id", "planets_id"}
        form_columns = {"user_id", "characters_id", "planets_id"}

    class CharacterView(ModelView):
        form_columns = {"id", "name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender", "homeworld"}

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(CharacterView(Characters, db.session))
    admin.add_view(ModelView(Planets, db.session))
    admin.add_view(FavoriteView(Favorites, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
