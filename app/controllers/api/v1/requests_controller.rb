class Api::V1::RequestsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_request, only: [:show, :edit, :update, :destroy]

    def index
        @requests = Request.all
        
        render json: @requests
      end
      
      def show_request
        puts "REQUEST ID is :: #{params[:id]}"
        @request = Request.find(params[:id])
      end

      def get_request_by_user_id
        # @current_user_request = current_user.requests.all
        # ? in the parameter replaced by the current_user.id
        @user_request = Request.where("user_id = ?", current_user.id)
        render json: @user_request
      end
    
      # GET /requests
      def show
        render json: @request
        # render json: @user_requests
      end
    
      # POST /requests
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
        # @request = current_user.requests.build(request_params)
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
          params.permit(:title, :description, :latitude, :longitude, :request_type)
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
