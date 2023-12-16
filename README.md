# Kay Legendary's NICU Inventory Management

## About the App

This is a web application designed for managing inventory in a Neonatal Intensive Care Unit (NICU). It provides a user-friendly interface for tracking items, viewing dashboards, and managing inventory items details.

## Live Sites
- Frontend: https://main--legendary-bublanina-efa037.netlify.app/
- Backend:  https://inventoryap-4e7068857990.herokuapp.com

## User Stories

1. As a NICU staff member, I want to easily add new items to the inventory.
2. As a user, I want to view a dashboard summarizing key inventory statistics.
3. As a user, I want to see low stock items, status and items that need to be reordered.
4. As a user, I want to view detailed information about each inventory item.

## Technologies Used

- **Backend:** Python, Django
- **Frontend:** React
- **Database:** Django Object-Relational Mapping
- **API:** Django Rest Framework

## Installation Instructions

### Backend (Python/Django)

1. Clone the repository: `git clone [<backend-repo-url>](https://github.com/Kaymone1/inventoryappbackend.git)`
2. Navigate to the backend directory: `cd <backend-directory>`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - On macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Run migrations: `python manage.py migrate`
7. Start the Django development server: `python manage.py runserver`

### Frontend (React)

1. Clone the repository: `git clone [<frontend-repo-url>](https://github.com/Kaymone1/my-nicu-app.git)`
2. Navigate to the frontend directory: `cd nicuapp`
3. Install dependencies: `npm install`
4. Start the React development server: `npm start`

## Unsolved Mysteries

-I wanted to use a barcode api where I could scan items into the inventory instead of manually adding all the items. 
- Being able to search and filter items

