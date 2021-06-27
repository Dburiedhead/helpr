class Api::V1::UsersController < ApplicationController
  def show
    user = current_user
    avatar = rails_blob_path(user.avatar)
    render json: {user: user, avatar: avatar}
  end
end
