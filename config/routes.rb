Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] #sign up
    resource :session, only: [:create, :destroy] #sign in / sign out
  end
end
