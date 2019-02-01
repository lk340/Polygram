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

# Post.destroy_all
# Post.create(caption: "test")
# caption, user_id, photo