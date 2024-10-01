import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ columns, data }) {

    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
            sx={{ overflow: 'clip', }}
        />
    );
}
