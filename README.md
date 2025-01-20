# Widestage Reporting Tool
The Widestage Reporting Tool is a powerful and intuitive solution designed to simplify the process of generating, managing, and analyzing reports. Whether you're handling business metrics, project progress, or data analytics, this tool provides a seamless experience for creating customizable reports and visualizing data in a clear and actionable format.

## Features
Flexible Data Sources: Connect to MongoDB databases or upload files (CSV/JSON) to generate reports.

Customizable Queries: Write custom queries to filter and extract the data you need.

Report Generation: Generate reports in JSON or CSV format.

Report Management: Save and organize reports with metadata (e.g., report name, creator, creation date).

User-Friendly API: Easily integrate the tool with your existing systems using a RESTful API.

## Supported database
MongoDB: Connect to any MongoDB database to fetch data for reports.

## Requirements
To run the Widestage Reporting Tool, you need the following:

Node.js: JavaScript runtime environment.

Express: Web framework for building the API.

MongoDB: Database for storing report metadata and user data.

npm: Node.js package manager for installing dependencies.

## Installation
Follow these steps to set up the Widestage Reporting Tool:

### 1-Clone Repository
git clone https://github.com/MennaFoda25/u.git
cd u

### 2-Install Dependencies
npm install

### 3-Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=3000

### 4-Start the Server
npm start
