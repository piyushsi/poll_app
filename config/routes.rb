Rails.application.routes.draw do
  root "homepage#index"
  get "*path", to: "homepage#index", via: :all

  post "/login", to: "sessions#create"
  post "/logout", to: "sessions#destroy"
  get "/logged_in", to: "sessions#is_logged_in?"
  resources :users, only: [:create, :show, :index] do
    resources :items, only: [:create, :show, :index, :destroy]
  end
end
