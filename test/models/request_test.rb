require 'test_helper'

class RequestTest < ActiveSupport::TestCase
  test "title should exist" do
    request = Request.new
    assert_not_nil request.title, "Request needs a title"
  end

  test "description should exist" do
    request = Request.new
    assert_not_nil request.description, "Request needs a description"
  end

  test "latitude should exist" do
    request = Request.new
    assert_not_nil request.latitude, "Request needs a latitude"
  end

  test "longitude should exist" do
    request = Request.new
    assert_not_nil request.longitude, "Request needs a longitude"
  end

  test "request_type should exist" do
    request = Request.new
    assert_not_nil request.request_type, "Request needs a request_type"
  end

  test "user should exist" do
    request = Request.new
    assert_not_nil request.user, "Request needs a user"
  end

  test "description should be under 300 characters" do
    request = Contester.new
    assert_operator request.description.try(:length), :<=, 300, "The description is too long"
  end
end
