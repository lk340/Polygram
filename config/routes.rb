Rails.application.routes.draw do
  root to: "static_pages#root"
  
  namespace :api, defaults: { format: :json } do
    # User Auth Start
    resources :users, only: [:index, :show, :create, :update] #sign up
    resource :session, only: [:create, :destroy] #sign in / sign out
    # User Auth End

    # resources :posts, only: [:index, :show, :create, :edit, :update, :destroy] do
    #   resources :likes, only: [:index, :create, :destroy]
    # end

    resources :posts, only: [:index, :show, :create, :edit, :update, :destroy]
    resources :likes, only: [:index, :create, :destroy]
    resources :comments, only: [:create, :update, :destroy]
  end
end

# Index
# Show
# New
# Create
# Edit
# Update
# Delete
