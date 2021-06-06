class Api::V1::ResponsesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_response, only: [:show, :edit, :update, :destroy]
  # before_action :current_request
  
  def index
    @responses = Response.all
    # @responses = current_user.responses.all
    
    render json: @responses
  end
  
  # GET /responses
  def show
    render json: @response
  end
  
  # ? in the parameter replaced by the current_user.id
  def get_response_by_user_id
    # puts "CURRENT USER IS WATCHING :: #{@response.user = current_user?}"
    @user_response = Response.where("user_id = ?", current_user.id)
    render json: @user_response
  end

  # POST /responses
  def create
    puts "REQUEST is :: #{Request.where(:id => params[:request_id])}"
    puts "REQUEST COUNTER is :: #{Request.find(params[:request_id]).response_counter}"
    # puts "CURRENT REQUEST is :: #{current_request}"
    # puts "REQUEST counter is :: #{@current_request.find(params[:response_counter])}"
    @response = current_user.responses.build(response_params)
        # @current_request = Request.find(:id => params[:request_id])
    if Request.find(params[:request_id]).response_counter < 5
      Request.find(params[:request_id]).update(:response_counter => Request.find(params[:request_id]).response_counter + 1, :request_status => Request.find(params[:request_id]).request_status = "pending")
      if Request.find(params[:request_id]).response_counter == 4
        Request.find(params[:request_id]).update(:response_counter => Request.find(params[:request_id]).response_counter + 1, :fulfilled => Request.find(params[:request_id]).fulfilled = true, :request_status => Request.find(params[:request_id]).request_status = "hidden")
    #     if Request.find(params[:request_id]).response_counter == 5
    #       handle_max_responses
      else
        handle_unauthorized
      end
    end
  end
  # if authorized?
  #   if @response.save
  #     render json: @response , status: :created, location: api_v1_response_url(@response)
  #   else
  #     render json: @response.errors, status: :unprocessable_entity
  #   end
  # else
  #   handle_unauthorized
  # end

  def update
    # @response = current_user.responses.build(response_params)
    if authorized?
      if @response.update(response_params)
        render json: @response, status: :ok, location: api_v1_response_url(@response)
      else
        render json: @response.errors, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end
    
  def destroy
    Request.find(params[:request_id]).update(:response_counter => Request.find(params[:request_id]).response_counter - 1)
    if authorized?
      @response.destroy
        head :no_content
      
    else
      handle_unauthorized
    end
  end
      
  private

    # def current_request
    #   @current_request == Request.find(params[:request_id])
    # end

    def set_response
      @response = Response.find(params[:id])
    end
    
    def response_params
      params.require(:response).permit(:message, :selected, :request_id)
    end

    def authorized?
      @response.user == current_user
    end

    def handle_unauthorized
      respond_to do
        render json: { error: "You are not authorized to perform this action.", status: 401 }, status: 401
      end
    end

    def handle_max_responses
      respond_to do
        render json: { error: "5 Helprz already responded to this request, you will be able to respond if the request gets unfulfilled", status: 401 }, status: 401
      end
    end
end
