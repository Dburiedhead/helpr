class UserSerializer < ActiveModel::Serializer
    attributes :id, :created_at, :avatar, :gov_approved_id, :first_name, :last_name
    # attribute :avatar_url do |user| 
    #   Rails.application.routes.url_helpers.rails_blob_path(user.avatar) if user.avatar.attached?
    # end
    # attribute :rooms do |user|
    #   user.rooms.uniq
    # end
  end