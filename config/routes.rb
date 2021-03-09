Rails.application.routes.draw do
  root "homepage#index"
  get "*path", to: "homepage#index", via: :all

  post "/login", to: "sessions#create"
  post "/logout", to: "sessions#destroy"
  post "/logged_in", to: "sessions#is_logged_in?"
  post "/poll", to: "polls#create"
  post "/poll_list", to: "polls#index"
  post "/single_poll/:id", to: "polls#show"
  post "/votes", to: "votes#create"
  post "/isvoted", to: "votes#check"


  
  resources :users, only: [:create, :show, :index] do
    resources :items, only: [:create, :show, :index, :destroy]
  end
end