# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create(username: "demoUser", email: "demoUser@demo", password: "demodemo", name: "Demo User", biography: "I am a demo user!")
User.create(username: "apple", email: "apple@apple", password: "aaaaaa", name: "apple", biography: "Everyone has a story to tell.")
User.create(username: "microsoft", email: "microsoft@microsoft", password: "aaaaaa", name: "Microsoft", biography: "The official Instagram account of Microsoft. Celebrating people who use technology to break boundaries and achieve more.")
User.create(username: "google", email: "google@google", password: "aaaaaa", name: "Google", biography: "Google unfiltered—sometimes with filters.")

# Post.destroy_all
# Post.create(caption: "test")
# caption, user_id, photo