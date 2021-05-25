class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :configure_permitted_parameters, if: :devise_controller?

    # before_action :set_user

    protected
        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:avatar])
            devise_parameter_sanitizer.permit(:account_update, keys: [:avatar])
            devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:first_name, :last_name, :email, :password)}
            devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :email, :password, :current_password)}
        end
    
    private
    # def set_user
    #     if current_user.present?
    #         cookies[:user_id] = current_user.id
    #         cookies[:user_email] = current_user.email
    #         cookies[:user_first_name] = current_user.first_name
    #         cookies[:user_last_name] = current_user.last_name
    #     end
    # end
end
