class User < ApplicationRecord
  has_many :requests
  has_many :conversations, through: :messages
  has_many :messages
  has_one_attached :avatar
  has_one_attached :gov_approved_id
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  after_commit :add_default_avatar, on: %i[create update]

  
  def avatar_thumbnail
    if avatar.attached?
      avatar.variant(resize: "150x150!").processed
    else
      '/default_avatar.png'
    end
  end

  private
  
  def add_default_avatar
    unless avatar.attached?
      avatar.attach(
        io: File.open(
          Rails.root.join(
            'app', 'assets', 'images', 'default_avatar.png'
          )
        ),
        filename: 'default_avatar.png',
        content_type: 'image/png, image/jpg'
      )
    end
  end
end
