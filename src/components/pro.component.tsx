import * as data from '@/dummy-data'
import {
    Button,
    DataGridProvider, FIBin,
    Icon,
    Menu, MenuProvider, MenuSection,
    Portal,
    Text, View,
    useDialog,
    DataGrid,
    DataGridHeader,
    DataGridTypes,
    dataGridState,
    dispatchDataGridEvent
} from '@fold-ui/core'
import { useState } from 'react'

export const DataGridExample = () => {
    const [columnWidths, setColumnWidths] = useState(data.widths)
    const [columns, setColumns] = useState<DataGridTypes.Column[]>(data.columns)
    const [footerColumns, setFooterColumns] = useState<DataGridTypes.Column[]>(data.footer)
    const [columnTypes, setColumnTypes] = useState(data.columnTypes)
    const [rows, setRows] = useState<DataGridTypes.Cell[][]>(data.lessRows)
    const { setDialog, closeDialog } = useDialog()

    const handleColumnMove = ({ origin, target }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleColumnMove({ origin, target })
    }

    const handleRowMove = ({ origin, target }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleRowMove({ origin, target })
    }

    const handleColumnClick = (index, column: DataGridTypes.Column) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleColumnClick(index, column)
    }

    const handleCellUpdate = ({ value, row, col }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleCellUpdate({ value, row, col })
    }

    const handleCellDelete = ({ row, col }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleCellDelete({ row, col })
    }

    return (
        <>
            <style>
                {`
                    input[type="range"].f-dummy-gradient-range {
                        padding: 0;
                        margin: 0;
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;   
                        z-index: 5;
                        -webkit-appearance: none;
                        background: linear-gradient(to right,rgb(98, 0, 255) 0%, rgb(255, 0, 255) 100%);
                    }

                    input[type="range"].f-dummy-gradient-range::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 28px;
                        width: 5px;
                        border: none;
                        background-color: var(--f-color-surface);
                        box-shadow: none;
                    }

                    input[type="range"].f-dummy-gradient-range:focus::-webkit-slider-thumb {
                        outline: none;
                    }

                    input[type="range"].f-dummy-gradient-range:hover::-webkit-slider-thumb {
                        cursor: pointer;
                        background-color: var(--f-color-surface);
                        border: none;
                    }

                    input[type="range"].f-dummy-gradient-range::-webkit-slider-runnable-track  {
                        -webkit-appearance: none;
                        box-shadow: none;
                        border: none;
                        background: transparent;
                    }
                `}
            </style>
            <MenuProvider
                menu={({ data: { target, payload }, dismiss }) => (
                    <Menu>
                        <MenuSection>Menu for: {target}</MenuSection>
                    </Menu>
                )}>
                <DataGridProvider
                    id="instance-1"
                    columnWidths={columnWidths}
                    columnTypes={columnTypes}
                    defaultCellSelection={{}}
                    defaultRowSelection={{}}
                    draggableColumns
                    draggableRows
                    maxRowsSelectable={undefined}
                    singleRowSelect={false}
                    onSelect={({ rows, cols }: any) => null}>
                    <DataGrid
                        variant="virtual"
                        virtual={{
                            rows: 10,
                            rowHeight: 40,
                            paddingTop: 40,
                            paddingBottom: 30,
                        }}
                        rows={rows}
                        hideCheckbox={false}
                        useFoldScroll
                        header={
                            <DataGridHeader
                                resizableColumns
                                columns={columns}
                                onColumnClick={handleColumnClick}
                                onWidthChange={(index, width) =>
                                    setColumnWidths(columnWidths.map((w, i) => (i == index ? width : w)))
                                }
                            />
                        }
                        footer={
                            <DataGridHeader
                                hideCheckbox
                                component={data.FooterCell}
                                columns={footerColumns}
                                style={{
                                    '--f-data-grid-cell-height': '30px',
                                    'bottom': 0,
                                }}
                            />
                        }
                        pinFirst
                        pinLast
                        onCellUpdate={handleCellUpdate}
                        onCellDelete={handleCellDelete}
                        onColumnMove={handleColumnMove}
                        onRowMove={handleRowMove}
                        onScroll={(e) => null}
                        toolbar={({ rowSelection, cellSelection }) => (
                            <View
                                row
                                position="absolute"
                                bgToken="surface-inverse"
                                colorToken="text-on-color"
                                p="1rem 2rem"
                                radius="var(--f-radius)"
                                shadow="var(--f-shadow-xl)"
                                zIndex={1000}
                                gap={10}
                                display={!Object.values(rowSelection).length ? 'none' : 'flex'}
                                style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                                <Text color="inherit">
                                    {Object.values(rowSelection).length}{' '}
                                    {Object.values(rowSelection).length == 1 ? 'row' : 'rows'} selected
                                </Text>
                                <Icon
                                    icon={FIBin}
                                    className="f-buttonize"
                                    onClick={() => {
                                        setDialog({
                                            title: 'Are you sure?',
                                            description: 'This action cannot be undone.',
                                            portal: Portal,
                                            footer: (
                                                <View
                                                    width="100%"
                                                    row
                                                    justifyContent="space-between">
                                                    <Button onClick={closeDialog}>Cancel</Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            const rowIndexes = Object.keys(rowSelection).map(
                                                                (key: any) => +key.split('-')[1]
                                                            )
                                                            setRows(
                                                                rows.filter((_, index) => !rowIndexes.includes(index))
                                                            )
                                                            closeDialog()
                                                            dispatchDataGridEvent('select-rows', {
                                                                instanceId: 'instance-1',
                                                            })
                                                        }}>
                                                        Delete
                                                    </Button>
                                                </View>
                                            ),
                                        })
                                    }}
                                />
                            </View>
                        )}
                    />
                </DataGridProvider>
            </MenuProvider>
        </>
    )
}

export const ProComponent = () => {
    return (
        <View
            column
            height="fit-content"
            zIndex={10}
            position="relative"
            m="-475px 0 0 0"
            className="pro">         
            <View
                bgToken="surface"
                width="86%"
                shadow="var(--f-shadow-menu)"
                border="1px solid var(--f-color-border)"
                p="0rem"
                style={{ overflow: 'hidden' }}
                radius="var(--f-radius)"
                position="relative">
                <View
                    p="1rem"
                    style={{ 
                        overflow: 'auto',
                        maxHeight: 1000, 
                    }}
                    className="f-scrollbar"
                    justifyContent="flex-start"
                    alignContent="flex-start"
                    alignItems="flex-start"
                    >
                    <View
                        width="100%"
                        height="fit-content"
                        position="relative"
                        zIndex={0}>
                        <DataGridExample />
                    </View>
                </View>
            </View>
        </View>
    )
}
