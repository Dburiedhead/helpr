class UserSerializer < ActiveModel::Serializer
    attributes :id
    # attribute :avatar_url do |user| 
    #   Rails.application.routes.url_helpers.rails_blob_path(user.avatar) if user.avatar.attached?
    # end
    # attribute :rooms do |user|
    #   user.rooms.uniq
    # end
  end