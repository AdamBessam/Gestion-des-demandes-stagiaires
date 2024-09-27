import { Box } from '@mui/material';
import Action from './Actions/ActionPrf';

const TableActions = ({ params, deleteProfFromTable }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Action Action="plus d'informations" params={params} />
            <Action Action="Modifier les informations" params={params} />
            <Action Action="Supprimer" params={params} deleteProfFromTable={deleteProfFromTable} />
        </Box>
    );
}

export default TableActions;
