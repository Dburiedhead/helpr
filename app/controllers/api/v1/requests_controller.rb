class Api::V1::RequestsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :set_request, only: [:show, :edit, :update, :destroy]

  def index
    if user_signed_in?
      @requests = Request.where(request_status: ["opened", "pending", nil])
      render json: @requests
    else
      render body: 'Please sign in to access the application', status: 401
    end
  end
  
  def get_requests_by_user_id
    @user_requests = Request.where("user_id = ?", current_user.id)
    render json: @user_requests
  end
  
  def get_unfulfilled_request
    @unfulfilled_request = Request.where("fulfilled = ?", "false")
    render json: @unfulfilled_request
  end
  
  def show
    render json: @request
    ShownRequestsCleanupJob.set(wait: 15.seconds).perform_later(@request, @request.response_counter, @request.request_status)
  end

  def create
    @request = current_user.requests.build(request_params)
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
        if @request.fulfilled?
          @request.update(:request_status => @request.request_status = "closed")
        end
        # if @request.response_counter == 4
        #   @request.update(:request_status => @request.request_status = "jidden")
        # end
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
