require 'test_helper'

class Api::V1::RequestControllerTest < ActionDispatch::IntegrationTest
  setup do
    @request = requests(:one)
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

  # show
  test "should return request" do
    get request_url(@request)
    assert_response :success
  end
  
  test "should show request that includes current user" do
    get :show
    assert_equal current_user.id, request.helpr_id || request.requester_id
  end
  
  # create
  test "should create request" do
    assert_difference('Request.count') do
      post '/api/v1/requests', params: { request: { user_id: requests(:one).user_id, title: requests(:one).title, description: requests(:one).description, latitude: requests(:one).latitude, longitude: requests(:one).longitude, request_type: requests(:one).request_type}}, as: :json
    end
    
    assert_response :success
  end
end
