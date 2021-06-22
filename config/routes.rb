Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root 'pages#index', as: :authenticated_root
  end
  
  devise_scope :user do
    root to: 'devise/sessions#new'
  end
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :requests, param: :id
      get 'current_user_request', to: 'requests#get_request_by_user_id'
      get 'current_user_first_name', to: 'messages#get_user_first_name'
      get 'current_user_first_name', to: 'messages#get_user_first_name'
      get 'current_user_full_name', to: 'conversations#get_user_full_name'
      get 'unfulfilled_request', to: 'request#unfulfilled_request'
      resources :conversations, only: [:index, :show, :create, :destroy], param: :id
      resources :messages, only: [:index, :show, :create]
      mount ActionCable.server => '/cable'
    end
  end
  get '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
