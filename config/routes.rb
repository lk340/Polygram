Rails.application.routes.draw do
  root to: "static_pages#root"
  
  namespace :api, defaults: { format: :json } do
    # User Auth Start
    resources :users, only: [:index, :create] #sign up
    resource :session, only: [:create, :destroy] #sign in / sign out
    # User Auth End

    resources :posts, only: [:index, :show, :create, :edit, :update, :destroy]
  end
end

# Index
# Show
# New
# Create
# Edit
# Update
# Delete
