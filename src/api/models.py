from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(120), unique=True)
    name: Mapped[str] = mapped_column(String(120))
    surname: Mapped[str] = mapped_column(String(120))
    signup_date: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    favorites: Mapped[List["Favorites"]] = relationship("Favorites", back_populates="user", cascade=("all, delete-orphan"))

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "surname": self.surname,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def all_user_favorites(self):
        results_favorites = list(map(lambda item: item.serialize(), self.favorites))
        print(self.favorites)
        return {
            "id": self.id,
            "username": self.username,
            "favorites": results_favorites,
        }


class Characters(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120))
    height: Mapped[int] = mapped_column(Integer())
    mass: Mapped[int] = mapped_column(Integer())
    hair_color: Mapped[str] = mapped_column(String(120))
    skin_color: Mapped[str] = mapped_column(String(120))
    eye_color: Mapped[str] = mapped_column(String(120))
    birth_year: Mapped[str] = mapped_column(String(120))
    gender: Mapped[str] = mapped_column(String(120))

    homeworld: Mapped[int] = mapped_column(ForeignKey("planets.id"), nullable=True)
    favorites: Mapped[int] = relationship("Favorites", back_populates="characters")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender,
            "homeworld": self.homeworld,
        }

    def id_and_name(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Planets(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120))
    rotation_period: Mapped[int] = mapped_column(Integer())
    orbital_period: Mapped[int] = mapped_column(Integer())
    diameter: Mapped[int] = mapped_column(Integer())
    climate: Mapped[str] = mapped_column(String(120))
    terrain: Mapped[str] = mapped_column(String(120))
    surface_water: Mapped[int] = mapped_column(Integer())
    population: Mapped[int] = mapped_column(Integer())
    was_born: Mapped[List["Characters"]] = relationship()

    favorites: Mapped[int] = relationship("Favorites", back_populates="planets")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "diameter": self.diameter,
            "climate": self.climate,
            "terrain": self.terrain,
            "surface_water": self.surface_water,
            "population": self.population,
            "was_born": list(map(lambda item: item.id_and_name(), self.was_born)),
        }


class Favorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    characters_id: Mapped[int] = mapped_column(ForeignKey("characters.id"), nullable=True)
    planets_id: Mapped[int] = mapped_column(ForeignKey("planets.id"), nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="favorites")
    characters: Mapped["Characters"] = relationship("Characters", back_populates="favorites")
    planets: Mapped["Planets"] = relationship("Planets", back_populates="favorites")

    def serialize(self):
        result = {"id": self.id, "user_id": self.user_id}
        if self.characters_id and self.characters:
            result["resource_id"] = self.characters_id
            result["type"] = "character"
            result["name"] = self.characters.name

        elif self.planets_id and self.planets:
            result["resource_id"] = self.planets_id
            result["type"] = "planet"
            result["name"] = self.planets.name

        return result