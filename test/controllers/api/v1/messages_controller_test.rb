require 'test_helper'

class Api::V1::MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @message = messages(:one)
  end

  # index
  test "should get index as json" do
    get :index
    assert_equal "application/json", response.content_type include()
  end

  test "should return success" do
    assert_response :success
    get :index
  end
  
  # create
  test "should create message" do
    assert_difference('Message.count') do
      post '/api/v1/messages', params: { message: { text: @message.text, conversation_id: conversations(:one).id, user_id: dianka.id } }, as: :json
    end
    
    assert_response :success
  end
end
