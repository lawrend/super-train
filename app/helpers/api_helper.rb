module ApiHelper

  # Use name of state as address and return google map - causes map to zoom in after state selection
  def generate_state_map(name)
    map_name = name.gsub(" ", "+")
    conn = Faraday.new "https://maps.googleapis.com/maps/api/"
    resp = conn.get("geocode/json?address= #{map_name}&key=#{ENV['MAPS_KEY']}")
    @place = JSON.parse(resp.body)
    @new_place = @place['results'][0]['geometry']['location']
  end

  #provide name to google, get coordinates for place
  def get_coordinates(name)
    map_name = name.gsub(" ", "+")
    conn = Faraday.new "https://maps.googleapis.com/maps/api/"
    resp = conn.get("geocode/json?address= #{map_name}&components=country:US&key=#{ENV['MAPS_KEY']}")
    @place = JSON.parse(resp.body)
  end

  # add lat and lng attributes to location
  def add_lat_lng(pa)
    map_name = pa.loc.gsub(" ", "+")
    conn = Faraday.new "https://maps.googleapis.com/maps/api/"
    resp = conn.get("geocode/json?address= #{map_name}&key=#{ENV['MAPS_KEY']}")
    @place = JSON.parse(resp.body)
    if @place['status'] == "OK"
      @lat = @place['results'][0]['geometry']['location']['lat'] 
      @long = @place['results'][0]['geometry']['location']['lng'] 
      pa.update(lat: @lat, long: @long)
    end
  end

  def convert_state_abbrev(abbrev)
    case abbrev
    when "AK"
      return "Alaska"
    when "AL"
      return "Alabama"
    when "AR"
      return "Arkansas"
    when "AS"
      return "American Samoa"
    when "AZ"
      return "Arizona"
    when "CA"
      return "California"
    when "CO"
      return "Colorado"
    when "CT"
      return "Connecticut"
    when "DE"
      return "Delaware"
    when "FL"
      return "Florida"
    when "GA"
      return "Georgia"
    when "GU"
      return "Guam"
    when "HI"
      return "Hawaii"
    when "IA"
      return "Iowa"
    when "ID"
      return "Idaho"
    when "IL"
      return "Illinois"
    when "IN"
      return "Indiana"
    when "KS"
      return "Kansas"
    when "KY"
      return "Kentucky"
    when "LA"
      return "Louisiana"
    when "MA"
      return "Massachusets"
    when "MD"
      return "Maryland"
    when "ME"
      return "Maine"
    when "MI"
      return "Michigan"
    when "MN"
      return "Minnesota"
    when "MO"
      return "Missouri"
    when "MS"
      return "Mississippi"
    when "MT"
      return "Montana"
    when "NC"
      return "North Carolina"
    when "ND"
      return "North Dakota"
    when "NE"
      return "Nebraska"
    when "NJ"
      return "New Jersey"
    when "NM"
      return "New Mexico"
    when "NV"
      return "Nevada"
    when "NY"
      return "New York"
    when "OH"
      return "Ohio"
    when "OK"
      return "Oklahoma"
    when "OR"
      return "Oregon"
    when "PA"
      return "Pennsylvania"
    when "PR"
      return "Puerto Rico"
    when "RI"
      return "Rhode Island"
    when "SC"
      return "South Carolina"
    when "SD"
      return "South Dakota"
    when "TN"
      return "Tennessee"
    when "TX"
      return "Texas"
    when "UM"
      return "United States Minor Outlying Islands"
    when "UT"
      return "Utah"
    when "VA"
      return "Virgina"
    when "VI"
      return "Virgin Islands"
    when "WA"
      return "Washington"
    when "WI"
      return "Wisconsin"
    when "WV"
      return "West Virginia"
    when "WY"
      return "Wyoming"
    else
      return abbrev
    end
  end


end
