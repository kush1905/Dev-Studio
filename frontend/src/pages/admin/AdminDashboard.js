import React, { useState } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import AddProject from '../../components/admin/AddProject';
import AddClient from '../../components/admin/AddClient';
import ViewContacts from '../../components/admin/ViewContacts';
import ViewNewsletters from '../../components/admin/ViewNewsletters';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="admin-dashboard">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        {activeTab === 'projects' && <AddProject />}
        {activeTab === 'clients' && <AddClient />}
        {activeTab === 'contacts' && <ViewContacts />}
        {activeTab === 'newsletters' && <ViewNewsletters />}
      </div>
    </div>
  );
}

export default AdminDashboard;

