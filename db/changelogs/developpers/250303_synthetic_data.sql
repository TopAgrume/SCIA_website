INSERT INTO
  event (
    id,
    name,
    about,
    link,
    by,
    place,
    start_date,
    end_date,
    created_by
  )
VALUES
  (
    '3f32adf8-20a2-4bab-ac64-aecee21b04fa',
    'Tech Expo 2024',
    'An exhibition of the latest technology advancements',
    'https://techexpo2024.com',
    'TechCorp',
    'San Francisco, CA',
    '2024-05-14',
    '2024-05-15',
    'johndoe'
  ),
  (
    'b1878ee0-e85d-4f41-ae6c-61404a187522',
    'Art Gala',
    'An exclusive gala showcasing modern art',
    'https://artgala.com',
    'ArtWorld',
    'New York, NY',
    '2024-07-01',
    '2024-07-01',
    'janedoe'
  ),
  (
    '0dac0b0e-91af-420e-9779-92b77d4d8739',
    'Food Fest 2024',
    'A festival celebrating food from around the world',
    'https://foodfest2024.com',
    'Foodies Inc.',
    'Austin, TX',
    '2024-08-21',
    '2024-08-23',
    'alexsmith'
  ),
  (
    '11c77afd-a7e1-4df7-90f8-a54984193cf0',
    'Music for Change',
    'A charity concert featuring popular artists',
    'https://musicforchange.org',
    'GoodVibes Foundation',
    'Los Angeles, CA',
    '2024-06-10',
    '2024-06-10',
    'emilyrose'
  ),
  (
    '2f4b2cd3-e9b8-48b5-9808-ed77613fb555',
    'Developer Summit',
    'Conference for software developers and engineers',
    'https://devsummit.com',
    'CodeNation',
    'Seattle, WA',
    '2024-09-10',
    '2024-09-12',
    'miketurner'
  ),
  (
    'eefe1ee3-8493-4d48-ae24-e3b1a947eb4c',
    'Green Future Forum',
    'A forum on sustainable practices and eco-friendly technology',
    'https://greenfutureforum.com',
    'EcoTech',
    'Denver, CO',
    '2024-10-05',
    '2024-10-06',
    'lucasjohnson'
  ),
  (
    '6921f3bc-cdae-4a47-8260-65579ac660e4',
    'Global Startups Meetup',
    'Networking event for startups worldwide',
    'https://globalstartups.com',
    'Startup Connect',
    'Chicago, IL',
    '2024-11-20',
    '2024-11-21',
    'sarahwhite'
  ),
  (
    '2e31bc43-aded-4d94-bb28-0363d0a5a727',
    'Gaming Con 2024',
    'Gaming convention with the latest in gaming tech and trends',
    'https://gamingcon2024.com',
    'GameHub',
    'Las Vegas, NV',
    '2024-04-15',
    '2024-04-17',
    'tommiller'
  ),
  (
    '66026608-c8cd-4ae0-adb5-b79489b0f7ab',
    'Health & Wellness Fair',
    'A fair promoting healthy lifestyles and wellness practices',
    'https://healthfair2024.com',
    'WellnessOrg',
    'Miami, FL',
    '2024-03-12',
    '2024-03-12',
    'lisamartin'
  ),
  (
    'e70d8090-3409-4378-93e2-eedd8ae9a990',
    'Science Symposium',
    'Symposium discussing advancements in scientific research',
    'https://sciencesymposium.com',
    'SciNet',
    'Boston, MA',
    '2024-12-01',
    '2024-12-03',
    'danielbrown'
  );

INSERT INTO
  suggestion (name, summary, link, type, created_by)
VALUES
  (
    'Boost Your Productivity',
    'Tips and tools to enhance daily productivity',
    'https://productivitytips.com',
    'ARTICLE',
    'johndoe'
  ),
  (
    'Understanding AI',
    'A beginner-friendly guide to artificial intelligence',
    'https://ai-guide.com',
    'ARTICLE',
    'janedoe'
  ),
  (
    'Healthy Eating on a Budget',
    'Guide to healthy eating without overspending',
    'https://healthyeating.com',
    'VIDEO',
    'alexsmith'
  ),
  (
    'Traveling on a Budget',
    'Top tips for affordable travel',
    'https://travelbudget.com',
    'VIDEO',
    'emilyrose'
  ),
  (
    'Getting Started with Python',
    'Beginner tips for learning Python programming',
    'https://pythonstart.com',
    'VIDEO',
    'miketurner'
  ),
  (
    'How to Meditate',
    'A complete guide to starting meditation',
    'https://meditationguide.com',
    'VIDEO',
    'lucasjohnson'
  ),
  (
    'Remote Work Best Practices',
    'Strategies for effective remote work',
    'https://remotework.com',
    'ARTICLE',
    'sarahwhite'
  ),
  (
    'Learning Spanish in 3 Months',
    'Tips for mastering Spanish quickly',
    'https://learnspanish.com',
    'VIDEO',
    'tommiller'
  ),
  (
    'Mastering Public Speaking',
    'Techniques for confident public speaking',
    'https://publicspeaking.com',
    'ARTICLE',
    'lisamartin'
  ),
  (
    'Investing for Beginners',
    'Basics of investing for new investors',
    'https://investing101.com',
    'ARTICLE',
    'danielbrown'
  );

INSERT INTO
  project (name, about, link, by, created_by)
VALUES
  (
    'OpenWeatherAPI Wrapper',
    'A Python wrapper for the OpenWeather API to fetch weather data.',
    'https://github.com/techenthusiast/openweatherapi-wrapper',
    'techenthusiast',
    'johndoe'
  ),
  (
    'Portfolio Website',
    'A simple, responsive portfolio website template using HTML, CSS, and JavaScript.',
    'https://github.com/designerx/portfolio-website',
    'designerx',
    'janedoe'
  ),
  (
    'Machine Learning Toolkit',
    'A collection of common ML algorithms implemented in Python.',
    'https://github.com/mlcoder/ml-toolkit',
    'mlcoder',
    'alexsmith'
  ),
  (
    'NodeJS Chat App',
    'A real-time chat application built using Node.js and Socket.io.',
    'https://github.com/chatdevs/nodejs-chat-app',
    'chatdevs',
    'emilyrose'
  ),
  (
    'React Dashboard',
    'A customizable admin dashboard template built with React and Redux.',
    'https://github.com/frontendhero/react-dashboard',
    'frontendhero',
    'miketurner'
  ),
  (
    'DevOps Automation Scripts',
    'Scripts for automating DevOps workflows with Ansible and Docker.',
    'https://github.com/devopsguru/automation-scripts',
    'devopsguru',
    'lucasjohnson'
  ),
  (
    'E-commerce Backend',
    'Backend services for an e-commerce app using Express and MongoDB.',
    'https://github.com/backendbuilder/ecommerce-backend',
    'backendbuilder',
    'sarahwhite'
  ),
  (
    'Personal Budget Tracker',
    'A mobile-friendly web app for tracking personal expenses.',
    'https://github.com/financemaster/budget-tracker',
    'financemaster',
    'tommiller'
  ),
  (
    'Django Blog App',
    'A blogging platform built with Django, featuring user authentication and comments.',
    'https://github.com/pythonista/django-blog-app',
    'pythonista',
    'lisamartin'
  ),
  (
    'CSS Animations Library',
    'A library of CSS animations for web development.',
    'https://github.com/webwizard/css-animations',
    'webwizard',
    'danielbrown'
  );

INSERT INTO
  public.event_attending (event_id, user_name, is_attending)
values
  (
    '3f32adf8-20a2-4bab-ac64-aecee21b04fa',
    'user1',
    true
  ),
  (
    '3f32adf8-20a2-4bab-ac64-aecee21b04fa',
    'user2',
    true
  ),
  (
    '3f32adf8-20a2-4bab-ac64-aecee21b04fa',
    'user3',
    false
  );