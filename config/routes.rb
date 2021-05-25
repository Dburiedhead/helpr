Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root 'pages#index', as: :authenticated_root
  end
  
  devise_scope :user do
    root to: 'devise/sessions#new'
    # root 'pages#ghome'
    # get '*path', to: 'pages#ghome', via: :all
  end
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # resources :requests, only: [:index, :show, :create, :update, :destroy]
      resources :requests, param: :id
      resources :responses, only: [:index, :show, :create, :update, :destroy]
      # resources :responses, only: [:create, :destroy]
      get 'current_user_request', to: 'requests#get_request_by_user_id'
      # get '/request/:id', to: 'requests#show_request', as: :show_request
    end
    
  end
  get '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
