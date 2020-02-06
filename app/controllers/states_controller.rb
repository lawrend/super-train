class StatesController < ApiController
  include ApiHelper
  before_action :set_state, only: [:show]
  before_action :set_state_by_name, only: [:state_locations, :add_cords_to_st_locations, :state_species]

  def index
    @states = State.all.order("name")
    render json: @states
  end

  # return json state names to use in the dropdown menu
  def states_for_dropdown
    @states = State.all.order("name")
    @states_options = @states.map do |l|
      {"key" => l.id, "value" => l.name, "text" => l.name, 'favorite'=> l.favorite}
    end
    render json: @states_options
  end

  def show
    render json: @state
  end

  def state_map
    @new_center = generate_state_map(params[:name])
    render json: @new_center
  end

  def state_locations
    @protected_areas = @state.locations
    render json: @protected_areas
  end

  # add_lat_lng is in ApiHelper
  def add_cords_to_st_locations
    @state_locs = @state.locations
    @state_locs.each do |pa|
      if pa.lat === nil
        add_lat_lng(pa)
      end
    end
    render json: @state_locs
  end

  def state_species
    @species = @state.species.uniq
    render json: @species
  end

  def update_favorite_states
    @faves = params[:favorites]
    State.all.each do |st|
      st.favorite = false;
      st.save
    end

    @faves.each do |fave|
      newFave = State.find_by(name: fave)
      newFave.favorite = true    
      newFave.save
    end
    self.get_favorite_states
  end

  def get_favorite_states
    @states = State.all
    faves = @states.filter{ |i| i if i.favorite === true }
    render json: faves
    end

  def reset_favorite_states
    @states = State.all
    @states.each do |st|
      st.favorite = false;
      st.save
    end
    self.get_favorite_states
  end


    # POST /locations
    def create
      @state = State.new(state_params)

      if @state.save
        render json: @state, status: :created, location: @state
      else
        render json: @state.errors, status: :unprocessable_entity
      end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_state
      @state = State.find(params[:id])
    end

    def set_state_by_name
      @state = State.find_by(name: params[:name])
    end
    # Only allow a trusted parameter "white list" through.
    def state_params
      params.require(:state).permit(:name, :abbrev, :favorite, :favorites )
    end
  end
