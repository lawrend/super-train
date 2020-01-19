module Enigma
  extend ActiveSupport::Concern

  module ClassMethods
    def get_enigma_dataset(datasetID)
      conn = Faraday.new "https://public.enigma.com/api/"
      resp = conn.get("datasets/#{datasetID}") do |req|
        req.headers['Authorization'] = "Bearer: #{ENV['ENIGMA_API_KEY']}"
      end
      snapshot = JSON.parse(resp.body)
      @snapshotID = snapshot['current_snapshot']['id']
      resp2 = conn.get("snapshots/#{@snapshotID}?&row_limit=1200&row_offset=0&include_serialids=true")do |req|
        req.headers['Authorization'] = "Bearer: #{ENV['ENIGMA_API_KEY']}"
      end
      @dataset = JSON.parse(resp2.body)
    end
  end
end
