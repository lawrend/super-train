namespace :start do
  desc 'Start development server'
  task :development do
    exec 'heroku local -f Procfile.dev'
  end
end

task :start => 'start:development'
