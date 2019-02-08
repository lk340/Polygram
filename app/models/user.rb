class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :email, presence: true
  validates :username, length: { minimum: 3, maximum: 12 }
  validates :password, length: { minimum: 6, maximum: 40, allow_nil: true }

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :posts
  has_many :followers

  has_one_attached :profile_picture
  
  # FGRIPE
  def self.find_by_credentials(username, password, email)
    @user = User.find_by(username: username, email: email)
    
    if @user && @user.is_password?(password)
      return @user
    end
    nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token = User.generate_session_token
  end
end
