class Post < ApplicationRecord
  validates :user_id, presence: true
  validate :ensure_photo

  def ensure_photo
    unless self.photo.attached?
      errors[:photo].push("You need to provide an image!")
    end
  end
  
  belongs_to :user

  # has_many :likes
  # has_many :comments

  # A special relation given by Active Storage
  has_one_attached :photo
  # has_many_attached :images
end
