class Follower < ApplicationRecord
  validates :user_id, :follower_id, presence: true

  belongs_to :user
end