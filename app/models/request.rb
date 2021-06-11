class Request < ApplicationRecord
    belongs_to :user
    has_many :conversations

    validates :title, presence: true
    validates :description, presence: true, length: {maximum: 300}
    validates :latitude, presence: true
    validates :longitude, presence: true
    validates :request_type, presence: true
    validates :user, presence: true
end
