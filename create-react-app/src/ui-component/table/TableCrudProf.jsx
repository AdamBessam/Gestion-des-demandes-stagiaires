import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import noFile from '../../assets/images/icons/noFile.png';
import axios from 'axios';
import Loader from '../Loader';
import { columns } from './Data/columnsPrf';
import AjouterProf from '../../ui-component/table/TableAjouter/ButtonAjouter/AjouterProf';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const CustomNoRowsOverlay = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };
  const imgStyle = {
    width: '50px',
    height: '50px'
  };

  return (
    <div style={containerStyle}>
      <img src={noFile} alt="Vide" style={imgStyle} />
      <div>Vide</div>
    </div>
  );
};

const TableCrudProf = () => {
  const [dataProfs, setDataProfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api1/v1/professeurs/getAll');
      setDataProfs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addProfToTable = (newProf) => {
    setDataProfs((prevData) => [...prevData, newProf]);
    fetchData();
  };

  const deleteProfFromTable = (id) => {
    console.log('Deleting professor from table with ID:', id);
    setDataProfs((prevData) => prevData.filter((prof) => prof._id !== id));
  };

  const rows = dataProfs.map((prof, index) => ({
    id: prof._id || index,
    col1: prof.cin,
    col2: prof.nom,
    col3: prof.prenom,
  }));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DataGrid
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              backgroundColor: 'white',
            }}
            rows={rows}
            columns={columns(deleteProfFromTable)}
            checkboxSelection={true}
            density="comfortable"
            slotProps={{ pagination: { labelRowsPerPage: 'Lignes par page' } }}
            slots={{
              toolbar: CustomToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            getRowId={(row) => row.id}
          />
          <AjouterProf addProfToTable={addProfToTable} />
        </>
      )}
    </>
  );
};

export default TableCrudProf;
