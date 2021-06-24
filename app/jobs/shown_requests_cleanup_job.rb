class ShownRequestsCleanupJob < ApplicationJob
  queue_as :default

  def perform(request)
    p 'Hello! from ShownRequestsCleanupJob'
    p 'Set request status to hidden'
    # Do something later
  end
end

# request = Request.find(params[:id])
# if request.response_counter = 0
#   if request.fulfilled = false
#     if request.status = opened
#       if request.updated_at > 24.hours.ago
#         request.status = hidden
#       end
#     end
#   end
# end