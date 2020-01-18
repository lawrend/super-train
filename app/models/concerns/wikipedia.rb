module Wikipedia
  require 'faraday_middleware'
  extend ActiveSupport::Concern

  # capitalize first letter of name replace spaces with underscore get summary page from wikipedia or not found
  def add_desc(name)
    @name = name.capitalize.gsub(" ", "_")
    conn = Faraday.new("https://en.wikipedia.org/") do |c|
      c.use FaradayMiddleware::FollowRedirects, limit: 3
      c.use Faraday::Adapter::NetHttp
    end
    resp = conn.get("api/rest_v1/page/summary/#{@name}?redirect=true") 
    @info = JSON.parse(resp.body)
    if @info['title'] == 'Not found.'
      self.update(desc: "Description not found")
    else
      self.update(desc: @info['extract'])
    end
    if @info['thumbnail']
      self.update(imgsrc: @info['thumbnail']['source'])
    else
      self.update(imgsrc: 'none')
    end
  end
end

