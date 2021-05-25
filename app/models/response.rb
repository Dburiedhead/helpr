class Response < ApplicationRecord
    belongs_to :user
    belongs_to :request

    validates :message, presence: true, length: {maximum: 150}
    validates :user, presence: true
end
