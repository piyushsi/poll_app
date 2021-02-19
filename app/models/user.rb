class User < ApplicationRecord
  EMAIL_VALIDATION = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  has_secure_password
  before_save { email.downcase! }
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, length: { maximum: 255 },
                    format: { with: EMAIL_VALIDATION },
                    uniqueness: { case_sensitive: false }
end
