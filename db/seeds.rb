# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create(username: "demoUser", email: "demoUser@demo", password: "demodemo", name: "Demo User", biography: "I am a demo user!")
User.create(username: "aaa", email: "aaa@aaa", password: "aaaaaa", name: "AAA aaa", biography: "AaaaaAAaAAaaAA aa aaAAa aA? AA.")
User.create(username: "michael", email: "michael@michael", password: "aaaaaa", name: "Michael Schwartz", biography: "I am Michael Schwartz.")
User.create(username: "logic", email: "logic@logic", password: "aaaaaa", name: "Logic", biography: "Twitter: Logic301")
User.create(username: "kevinhart4real", email: "kevinhart4real@kevinhart4real", password: "aaaaaa", name: "Kevin Hart", biography: "'Live Love & Laugh' Snapchat: Lilswag79 .... Facebook.com/HartKevin .... Twitter: Kevinhart4real .... #ComedicRockstar #IrresponsibleTour #HartBeat")
User.create(username: "therock", email: "therock@therock", password: "aaaaaa", name: "therock", biography: "Mana. Gratitude. Tequila. And not necessarily in that order..")
User.create(username: "marshmellomusic", email: "marshmellomusic@marshmellomusic", password: "aaaaaa", name: "marshmello", biography: "Mello made it right ™")
User.create(username: "marvel", email: "marvel@marve", password: "aaaaaa", name: "Marvel Entertainment", biography: "The official Instagram for Marvel comics, movies, games, and more.")

# Post.destroy_all
# Post.create(caption: "test")
# caption, user_id, photo