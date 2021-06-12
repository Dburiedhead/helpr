class Api::V1::MessagesController < ApplicationController
    before_action :authenticate_user!
    # before_action do
    #     @conversation = Conversation.find(params[:conversation_id])
    # end
    # before_action :set_message, only: [:show, :create]

    def index
        # @messages = @conversation.messages
        # @message = @conversation.messages.new
        @messages = Message.all
        render json: @messages
    end
    
    def create
        @message = Message.new(message_params)
        @message.user = current_user
        @message.save
        puts "CONVERSATION ID IS :: #{message_params}"
        conversation = Conversation.find(message_params[:conversation_id])
        if @message.save
            puts "successfully saved a message!"
            # ConversationsChannel.broadcast_to(conversation, {
            #     conversation: ConversationSerializer.new(conversation),
            #     users: UserSerializer.new(conversation.users),
            #     messages: MessageSerializer.new(conversation.messages)
            # })
            serialized_data = ActiveModelSerializers::Adapter::Json.new(MessageSerializer.new(@message)).serializable_hash
            MessagesChannel.broadcast_to conversation, serialized_data
            head :ok
        end
        # render json: MessageSerializer.new(@message)
        # render json: @message, status: :created
    end

    # def create
    #     @message = current_user.messages.build(message_params)
    #     puts "CONVERSATION ID IS :: #{@message}"
    #     conversation = Conversation.find(message_params[:conversation_id])
    #     if @message.save
    #         puts "successfully saved a message!"
    #         ConversationsChannel.broadcast_to(conversation, {
    #             conversation: ConversationSerializer.new(conversation),
    #             users: UserSerializer.new(conversation.users),
    #             messages: MessageSerializer.new(conversation.messages)
    #         })
    #     end
    #     render json: MessageSerializer.new(message)        
    # end

    private
        # def set_message
        #     @message = Message.find(params[:id])
        # end

        def message_params
            params.require(:message).permit(:text, :user_id, :conversation_id)
        end
end
