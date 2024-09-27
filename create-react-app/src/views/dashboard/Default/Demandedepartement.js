import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const DemandeDepartment = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/demandes/getDemandes');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (departmentId && requests.length > 0) {
      const filtered = requests.filter((request) => 
        request.departement._id === departmentId
      );
      setFilteredRequests(filtered);
    }
  }, [departmentId, requests]);

  const handleViewDetails = (requestId) => {
    navigate(`demande/${requestId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      {!location.pathname.includes('demande') && (
        <Table striped bordered hover responsive className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>État</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.nom}</td>
                <td>{request.prenom}</td>
                <td>{request.email}</td>
                <td style={{ color: getStatusColor(request.etatDemande) }}>
                  {request.etatDemande}
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleViewDetails(request._id)}>
                    Voir Détails
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Outlet />
    </div>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Accepter':
      return 'green';
    case 'Refuser':
      return 'red';
    case 'en attente':
      return 'blue';
    default:
      return 'black';
  }
};

export default DemandeDepartment;
