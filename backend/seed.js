const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Load models
const Client = require('./src/models/Client');
const Project = require('./src/models/Project');
const Contact = require('./src/models/Contact');
const Newsletter = require('./src/models/Newsletter');
const Admin = require('./src/models/Admin');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const sampleClients = [
    {
        name: 'TechCorp Solutions',
        description: 'A leading provider of enterprise software solutions focused on scalability and performance.',
        designation: 'Enterprise Client',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'GreenLeaf Innovations',
        description: 'Sustainable energy consultancy helping businesses transition to renewable power sources.',
        designation: 'Sustainability Partner',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Urban Architecture',
        description: 'Award-winning architectural firm specializing in modern urban living spaces.',
        designation: 'Design Partner',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Nexus Financial',
        description: 'Global financial services firm providing cutting-edge investment strategies and banking solutions.',
        designation: 'Finance Partner',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'BlueWave Digital',
        description: 'Creative agency specializing in digital marketing, branding, and interactive web experiences.',
        designation: 'Creative Partner',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Stellar Systems',
        description: 'Aerospace engineering company developing component systems for next-gen satellites.',
        designation: 'Engineering Client',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Quantum Health',
        description: 'Healthcare technology provider focusing on AI-driven diagnostic tools and patient management systems.',
        designation: 'Healthcare Partner',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    }
];

const sampleProjects = [
    {
        name: 'E-Commerce Dashboard',
        description: 'A comprehensive analytics dashboard for online retailers to track sales, inventory, and customer behavior in real-time.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Mobile Banking App',
        description: 'Secure and user-friendly mobile application for managing personal finances, transfers, and bill payments.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Smart Home Hub',
        description: 'IoT platform for controlling smart devices.',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        link: '#',
    },
    {
        name: 'Fitness Tracker Plus',
        description: 'Wearable integration app that monitors health metrics, tracks workouts, and provides personalized coaching plans.',
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Travel Companion',
        description: 'AI-powered travel planning application that suggests itineraries, books flights, and discovers local hidden gems.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'EduLearn Platform',
        description: 'Interactive online learning management system connecting students with tutors and offering video courses.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    },
    {
        name: 'Crypto Portfolio',
        description: 'Real-time cryptocurrency portfolio tracker with market analysis tools and secure wallet integration.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&q=80',
    }
];

const sampleContacts = [
    {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        city: 'New York',
        message: 'Interested in your services.',
    },
    {
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        mobile: '0987654321',
        city: 'San Francisco',
        message: 'Can we schedule a call?',
    },
    {
        fullName: 'Alice Johnson',
        email: 'alice.j@example.com',
        mobile: '5551234567',
        city: 'Chicago',
        message: 'Looking for a quote on a project.',
    },
];

const sampleNewsletter = [
    { email: 'subscriber1@example.com' },
    { email: 'subscriber2@example.com' },
    { email: 'newsletter.fan@test.com' },
];

const seedData = async () => {
    await connectDB();

    try {
        console.log('Clearing existing data...');
        await Client.deleteMany();
        await Project.deleteMany();
        await Contact.deleteMany();
        await Newsletter.deleteMany();
        // Intentionally NOT clearing Admin to preserve access

        console.log('Inserting sample data...');
        await Client.insertMany(sampleClients);
        console.log('Clients added');

        await Project.insertMany(sampleProjects);
        console.log('Projects added');

        await Contact.insertMany(sampleContacts);
        console.log('Contacts added');

        await Newsletter.insertMany(sampleNewsletter);
        console.log('Newsletter subscribers added');

        console.log('Data Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`Error with data seeding: ${error.message}`);
        process.exit(1);
    }
};

seedData();
