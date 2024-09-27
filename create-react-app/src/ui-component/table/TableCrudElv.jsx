import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import noFile from '../../assets/images/icons/noFile.png';
import Loader from '../Loader';
import { columns } from './Data/columns';
import Ajouter from '../../ui-component/table/TableAjouter/ButtonAjouter/AjouterElv';

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
        height: '50px',
    };

    return (
        <div style={containerStyle}>
            <img src={noFile} alt="Vide" style={imgStyle} />
            <div>Vide</div>
        </div>
    );
};

const TableCrudElv = () => {
    const [dataProfs, setDataProfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api1/v1/students/getStudents');
            setDataProfs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const addStudentToTable = (newStudent) => {
        setDataProfs(prevData => [...prevData, newStudent]);
        fetchData();
    };

    const rows = dataProfs.map((elv, index) => ({
        id: elv._id || index, 
        col1: elv.cne,
        col2: elv.nom,
        col3: elv.prenom,
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
                        columns={columns}
                        checkboxSelection={true}
                        density="comfortable"
                        slotProps={{ pagination: { labelRowsPerPage: 'Lignes par page' } }}
                        slots={{
                            toolbar: CustomToolbar,
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                    <Ajouter addStudentToTable={addStudentToTable} />
                </>
            )}
        </>
    );
};

export default TableCrudElv;
