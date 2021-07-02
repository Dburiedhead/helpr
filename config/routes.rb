Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root 'pages#index', as: :authenticated_root
  end
  
  # devise_scope :user do
  #   # root to: 'devise/sessions#new'
  #   root to: 'pages#index'
  # end

  root 'pages#index'
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :requests, param: :id
      resources :users, only: [:show], param: :id
      resources :conversations, only: [:index, :show, :create, :destroy, :update], param: :id
      resources :messages, only: [:index, :show, :create]
      mount ActionCable.server => '/cable'
      get 'current_user_data', to: 'users#get_current_user_data'
      get 'current_user_requests', to: 'requests#get_requests_by_user_id'
      get 'current_user_responses', to: 'conversations#get_responses_by_user_id'
      get 'current_user_help', to: 'conversations#get_responses_help'
      # get 'requests_conversations_by_user_id', to 'conversations#get_request_conversations_by_user_id'
      # get 'current_user_first_name', to: 'messages#get_user_first_name'
      get 'unfulfilled_request', to: 'request#unfulfilled_request'
    end
  end
  get '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
