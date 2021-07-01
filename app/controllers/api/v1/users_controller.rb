class Api::V1::UsersController < ApplicationController
  # include Rails.application.routes.url_helpers
  def show
    user = User.find(params[:id])
    user_requests = Request.where("user_id = ?", current_user.id)
    user_responses = Conversation.where("helpr_id = ?", current_user.id)
    render json: {first_name: user.first_name, last_name: user.last_name, avatar: user.avatar, requests: user_requests, responses: user_responses}
  end

  def get_user_data
    user_first_name = current_user.first_name
    user_last_name = current_user.last_name
    avatar = url_for(current_user.avatar)
    requests = Request.where("user_id = ?", current_user.id)
    responses = Conversation.where("helpr_id = ?", current_user.id)
    render json: {first_name: user_first_name, last_name: user_last_name, avatar: avatar, requests: requests, responses: responses}
  end
end
