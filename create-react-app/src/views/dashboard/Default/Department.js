// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col } from 'react-bootstrap';

// export default function Department() {
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/department/getDepartements');
//         if (!response.ok) {
//           throw new Error('Failed to fetch departments');
//         }
//         const data = await response.json();
//         console.log(data);
//         setDepartments(data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   return (
//     <Row className="g-4">
//       {departments.map((department) => (
//         <Col md={3} key={department._id}>
//           <Card>
//             <Card.Img
//               variant="top"
//               src={department.image || 'https://via.placeholder.com/150'}
//               style={{ borderRadius: '50%', height: '150px', width: '150px', objectFit: 'cover', margin: '10px auto' }}
//             />
//             <Card.Body className="text-center">
//               <Card.Title>{department.nomDepartement}</Card.Title>
//               <Card.Text>
//                 <button className="btn btn-primary">Voir les demandes</button>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/department/getDepartements');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        console.log(data);
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleViewRequests = (departmentId) => {
    navigate(`/admin/departments/${departmentId}`);
  };

  return (
    <Row className="g-4">
      {departments.map((department) => (
        <Col md={3} key={department._id}>
          <Card>
            <Card.Img
              variant="top"
              src={department.image || 'https://via.placeholder.com/150'}
              style={{ borderRadius: '50%', height: '150px', width: '150px', objectFit: 'cover', margin: '10px auto' }}
            />
            <Card.Body className="text-center">
              <Card.Title>{department.nomDepartement}</Card.Title>
              <Card.Text>
                <Button onClick={() => handleViewRequests(department._id)}>Voir les demandes</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
