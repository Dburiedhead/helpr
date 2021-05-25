class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_one_attached :avatar
  after_commit :add_default_avatar, on: %i[create update]

  has_many :requests
  has_many :responses
  
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
        content_type: 'image/png'
        # content_type: 'image/png, image/jpg, application/pdf'
        # content_type => /^document\/(png|gif|jpeg)/
      )
    end
  end
end
