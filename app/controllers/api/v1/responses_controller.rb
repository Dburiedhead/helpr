class Api::V1::ResponsesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_responses, only: [:show, :edit, :update, :destroy]

    def index
      @responses = Response.all
      # @responses = current_user.responses.all
  
      render json: @responses
    end
    
      # GET /responses
      def show
        render json: @response
      end
    
      # POST /responses
      def create
        @response = current_user.responses.build(response_params)
    
        if authorized?
          if @response.save
            render json: @response , status: :created, location: api_v1_response_url(@response)
          else
            render json: @response.errors, status: :unprocessable_entity
          end
        else
          handle_unauthorized
        end
      end
    
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
          if authorized?
            @response.destroy
              head :no_content
          else
            handle_unauthorized
          end
        end
        
    private

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
            unless authorized?
                respond_to do |format|
                    render json.error "You are not authorized to perform this action.", status: 401
                end
            end
        end
end
