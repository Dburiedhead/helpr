class Api::V1::UsersController < ApplicationController

  def index
    if user_signed_in?
      @users = User.where("id = #{current_user.id}")
      render json: @users
    else
      render body: 'Please sign in to access the application', status: 401
    end
  end

  def show
    user = User.find(params[:id])
    user_requests = Request.where("user_id = ?", current_user.id)
    user_responses = Conversation.where("helpr_id = ?", current_user.id)
    render json: {id: user.id, first_name: user.first_name, last_name: user.last_name, requests: user_requests, responses: user_responses}
  end

  def get_current_user_data
    requests = Request.where("user_id = ?", current_user.id)
    responses = Conversation.where("helpr_id = ?", current_user.id)
    render json: {id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, requests: requests, responses: responses}
  end
end
