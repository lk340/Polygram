class Post < ApplicationRecord
  validates :caption, :image_url, :user_id, presence: true

  belongs_to :user

  # has_many :likes
  # has_many :comments

  # A special relation given by Active Storage
  has_one_attached :photo
  # has_many_attached :images
end
