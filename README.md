# Kay Legendary's NICU Inventory Management

## About the App

Welcome to Kay Legendary's NICU Inventory Management app! This user-friendly web application is designed to streamline the management of Neonatal Intensive Care Unit (NICU) inventory. Whether you're a healthcare professional in charge of tracking medical supplies or a NICU administrator overseeing inventory levels, this app provides a seamless experience for adding, updating, and monitoring items.

With a clean and intuitive user interface, you can effortlessly navigate through the inventory list, view detailed item information, and even access a dashboard for a quick overview of essential metrics. The app aims to enhance efficiency and organization in NICU inventory management, ensuring that healthcare providers have the right supplies at the right time.

Take control of your NICU inventory management with Kay Legendary's NICU Inventory Management app – because every detail matters in delivering exceptional neonatal care for our future generations.


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

