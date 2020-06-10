class LocationsController < ApiController
  include ApiHelper 

  before_action :set_location, only: [:show, :getmap ]

  # GET /locations
  # either get all the species/locations records or make them
  def index
    if Location.all.count < 2
      @new_locations = Location.get_enigma_dataset("f2778fbc-47fd-45e3-a01a-936040650096")
      @rows = @new_locations['table_rows']['rows']
      @names = @rows.collect {|r| r[1,5]}
      @names.each do |n| 

        #change names for google search
        @modded_loc = n[2].gsub("NWR", "National Wildlife Refuge")
        @modded_loca = @modded_loc.gsub(".", "")
        @modded_loc2 = @modded_loca.gsub("WMA", "Wildlife Management Area")
        @modded_loc3 = @modded_loc2.gsub("WMD", "Wetland Management District")
        @long_state_name = convert_state_abbrev(n[3])

        #create species, states, locations, species_locations
        @species = Species.find_or_create_by(name: n[0], status: n[1] )
        @state = State.find_or_create_by(name: @long_state_name, abbrev: n[3])
        @location = Location.find_or_create_by(loc: @modded_loc3, st_abbrev: n[3], st: @long_state_name, other_states: n[4], state_id: @state.id)
        SpeciesLocation.find_or_create_by(species_id: @species.id, location_id: @location.id) end
    end

    #sort locations by state
    @locations= Location.all.sort_by{|x| x["st"]}
    render json:@locations 
  end

  # GET /locations/1
  def show
    render json: @location
  end

  # GET /locations/getmap/1
  def get_map
    # when provided a location returns the lat and long as a json object called center
    @coordinates = Location.get_coordinates(@location.loc) 
    #get_coordinates is apiHelper method 
    @lat = @coordinates['results'][0]['geometry']['location']['lat']
    @long = @coordinates['results'][0]['geometry']['location']['lng']
    @location.lat = @lat
    @location.long = @long
    @location.save
    #center contains latitude and longitude but is not an attribute of Location
    @center = @coordinates['results'][0]['geometry']['location']
    render json: @center
  end

  # GET /locations/species/1
  def get_species
    @location = Location.find_by(loc: params[:name])

    if @location.species
      @location.species.each do |sp|
        sp.add_desc(sp.name)
      end
      render json: @location.species 
    end
  end

  def locations_by_state
    @states = State.all.order("name")
    @states_options = @states.map do |l|
      {"key" => l.id, "value" => l.name, "text" => l.name}
    end
    render json: @states_options
  end


  # POST /locations
  def create
    @location = Location.new(location_params)

    if @location.save
      render json: @location, status: :created, location: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  # def update
  #   if @location.update(location_params)
  #     render json: @location
  #   else
  #     render json: @location.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /locations/1
  # def destroy
  #   @location.destroy
  # end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_location
    @location = Location.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def location_params
    params.require(:location).permit(:loc, :state, :other_states)
  end
end
