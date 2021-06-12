class Api::V1::RequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_request, only: [:show, :edit, :update, :destroy]

  def index
    @requests = Request.where.not("user_id = ?", current_user.id)
    # @requests = Request.where(:request_status => "opened" || "pending")
    render json: @requests
  end
  
  def show_request
    @request = Request.find(params[:id])
  end

  # ? in the parameter replaced by the current_user.id
  def get_request_by_user_id
    @user_request = Request.where("user_id = ?", current_user.id)
    render json: @user_request
  end

  def get_unfulfilled_request
    @unfulfilled_request = Request.where("request_status = ?", "unfulfilled")
    render json: @unfulfilled_request
  end

  def show
    render json: @request
  end

  def create
    @request = current_user.requests.build(request_params)
    puts "REQUEST PARAMS :: #{request_params}"
    if authorized?
      if @request.save
        render json: @request , status: :created, location: api_v1_request_url(@request)
      else
        render json: @request.errors, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      if @request.update(request_params)
        render json: @request, status: :ok, location: api_v1_request_url(@request)
      else
        render json: @request.errors, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end
    
  def destroy
    if authorized?
      @request.destroy
        head :no_content
    else
      handle_unauthorized
    end
  end
      
  private
    def set_request
        @request = Request.find(params[:id])
    end
    
    def request_params
        # params.require(:request).permit(:title, :description, :latitude, :longitude, :request_type)
        params.permit(:title, :description, :latitude, :longitude, :request_type, :fulfilled, :request_status, :response_counter)
    end

    def authorized?
      @request.user == current_user
    end   
    
    def handle_unauthorized
      unless authorized?
        respond_to do
          render json: { error: "You are not authorized to perform this action.", status: 401 }, status: 401
        end
      end
    end
end
