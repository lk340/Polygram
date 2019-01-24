class Post < ApplicationRecord
  validates :caption, :image_url, presence: true

  belongs_to :user

  # has_many :likes
  # has_many :comments
end
