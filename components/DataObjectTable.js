import { DataTable, Surface } from "react-native-paper";
import { PropTypes } from "prop-types";
import React from "react";

import style from "../styles/style";

const normalizeDataItem = (key, value) => {
    const item = { key, value };
    if (Array.isArray(value))
        item.value = `[ ${value
            .filter((m) => m.id)
            .map((m) => m.id)
            .join(", ")} ]`;

    return item;
};

const TableItem = ({ item }) => (
    <DataTable.Row>
        <DataTable.Cell style={style.datatableCellKey}>{item.key}</DataTable.Cell>
        <DataTable.Cell style={style.datatableCellValue}>{item.value}</DataTable.Cell>
    </DataTable.Row>
);

TableItem.propTypes = {
    item: PropTypes.object.isRequired,
};

const DataObjectTable = ({ data, children }) => (
    <Surface style={style.datatableSurface}>
        <DataTable style={style.datatable}>
            <DataTable.Header>
                <DataTable.Title style={{ flex: 2 }}>Property</DataTable.Title>
                <DataTable.Title style={{ flex: 5 }}>Value</DataTable.Title>
            </DataTable.Header>
            {data.keys
                .filter((k) => !["created_at", "updated_at", "url", "deleted_at"].includes(k))
                .map((k, i) => (
                    <TableItem item={normalizeDataItem(k, data[k])} key={i} />
                ))}
        </DataTable>
        {children}
    </Surface>
);

DataObjectTable.propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default DataObjectTable;
