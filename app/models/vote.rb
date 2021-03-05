class Vote < ApplicationRecord
  belongs_to :poll
  belongs_to :users
  belongs_to :options
end
