import * as data from '@/dummy-data'
import {
    Button,
    DataGrid,
    DataGridHeader,
    DataGridProvider,
    DataGridTypes,
    FIBin,
    Flexer,
    Form,
    Heading,
    Icon,
    Input,
    Link,
    Menu, MenuProvider, MenuSection,
    Modal,
    Option,
    Options,
    Portal,
    Text, View,
    dataGridState,
    dispatchDataGridEvent,
    generateUEID,
    useDialog
} from '@fold-ui/core'
import {
    CalendarDays,
    CalendarEventDetail,
    CalendarEventPreview,
    CalendarProvider,
    CalendarSchedule,
    CommonProvider,
    ContextPopup,
    Detail,
    FloatingToolbar,
    GroupDetail,
    GroupMenu,
    Kanban,
    KanbanProvider,
    KanbanSelection,
    KanbanTypes, LabelMenu,
    RichInputOption,
    RichInputProvider,
    Todo,
    TodoProvider,
    UserMenu,
    convert24toAmPm,
    dispatchKanbanEvent,
    dispatchTodoEvent,
    getDateSelectTimeFormat,
    getShortDateFormat,
    kanbanState,
    processHTML,
    todoState
} from '@fold-ui/pro'
import { useMemo, useState } from 'react'

export const CalendarExample = () => {
    const [option, setOption] = useState(2)
    const date = useMemo(() => data.date, [])
    const [days, setDays] = useState(data.days)
    const [daysDay, setDaysDay] = useState([data.days[0]])
    const [events, setEvents] = useState(data.events)
    const [custom, setCustom] = useState(data.custom)
    const [customDay, setCustomDay] = useState([[data.custom[0][0]]])
    const [options, setOptions] = useState<RichInputOption[]>([])
    const [event, setEvent] = useState<any>({})
    const [preview, setPreview] = useState<any>({})
    const [title, setTitle] = useState('')
    const { setDialog, closeDialog } = useDialog()

    const MonthView = ({ date, events }) => {
        return (
            <View
                width="100%"
                height="100%"
                column
                justifyContent="stretch"
                alignContent="stretch"
                alignItems="stretch">
                <View
                    row
                    position="relative"
                    zIndex={2}
                    width="100%"
                    m="0 0 -1px 0"
                    style={{ borderBottom: '1px solid var(--f-color-border)' }}>
                    <Text
                        p="1rem"
                        fontWeight="bold"
                        textAlign="center">
                        {date.toLocaleString('default', { month: 'long' })}
                    </Text>
                </View>
                <View
                    position="relative"
                    zIndex={1}
                    flex={1}
                    className="f-scrollbar"
                    style={{ overflowY: 'auto' }}>
                    <CalendarDays
                        date={date}
                        events={events}
                    />
                </View>
            </View>
        )
    }

    const ScheduleView = ({ days, custom, date, events }) => {
        return (
            <>
                <View
                    row
                    flex={0}
                    p="0 0 0 var(--f-calendar-schedule-gutter-width)"
                    width="100%">
                    {days.map(({ date }, index) => {
                        return (
                            <Text
                                flex={1}
                                p="1rem"
                                fontWeight="bold"
                                textAlign="center"
                                key={index}>
                                {getShortDateFormat(date)}
                            </Text>
                        )
                    })}
                </View>
                <View
                    height="fit-content"
                    p="0 4px 0 var(--f-calendar-schedule-gutter-width)"
                    width="100%"
                    position="relative"
                    zIndex={1}>
                    <CalendarDays
                        noClamp
                        date={date}
                        events={events.filter((e) => e.isDay)}
                        custom={custom}
                        height="fit-content"
                    />
                </View>
                <View
                    width="100%"
                    flex={1}
                    position="relative"
                    zIndex={0}
                    m="-1px 0 0 0"
                    style={{ overflowY: 'scroll' }}
                    className="f-scrollbar">
                    <CalendarSchedule
                        days={days}
                        events={events.filter((e) => !e.isDay)}
                    />
                </View>
            </>
        )
    }

    const handleEventUpdate = (ev) => {
        setEvents(events.map((event) => (event.id == ev.id ? { ...event, ...ev } : event)))
    }

    const handleEventDelete = (ev) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    row
                    width="100%"
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setEvents(events.filter((event) => event.id != ev.id))
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleEventOpen = (event, e) => {
        const { clientX, clientY } = e

        setPreview({
            x: clientX,
            y: clientY,
            event: events.find((e) => e.id == event.id),
        })
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        return (
            <ContextPopup
                item={{ ...payload }}
                onCancel={dismiss}
                onSave={(event) => {
                    dismiss()
                    handleEventUpdate({ ...payload, ...event })
                }}
                onView={() => {
                    dismiss()
                    setEvent(payload)
                }}
                onDelete={() => {
                    dismiss()
                    handleEventDelete(payload)
                }}
            />
        )
    }

    return (
        <>
            <Options
                //display="none"
                animated
                selected={option}
                onOptionChange={setOption}
                m="0 0 1rem 0">
                <Option>Day</Option>
                <Option>Week</Option>
                <Option>Month</Option>
            </Options>

            <View
                column
                width="100%"
                height={800}
                position="relative"
                justifyContent="stretch"
                alignContent="stretch"
                alignItems="stretch">
                <CommonProvider
                    onUserFilter={(val) => null}
                    onLabelFilter={(val) => null}
                    availableLabels={data.availableLabels}
                    availableUsers={data.availableUsers}
                    colors={data.colorPalette}>
                    {!!preview.event && (
                        <CalendarEventPreview
                            preview={preview}
                            onDismiss={() => setPreview({})}
                            onOpen={(event) => {
                                setEvent(event)
                                setPreview({})
                            }}
                        />
                    )}

                    {!!event.id && (
                        <CalendarEventDetail
                            event={event}
                            onCancel={() => {
                                setEvent({})
                            }}
                            onSave={(event) => {
                                handleEventUpdate(event)
                                setEvent({})
                            }}
                            onDelete={(event) => {
                                handleEventDelete(event)
                                setEvent({})
                            }}
                        />
                    )}

                    <MenuProvider menu={getMenu}>
                        <CalendarProvider
                            hideDateLabels={option == 0}
                            scheduleTimeFormat={(start, end) =>
                                getDateSelectTimeFormat(start) + ' - ' + getDateSelectTimeFormat(end)
                            }
                            gutterFormat={convert24toAmPm}
                            onEventOpen={handleEventOpen}
                            onEventUpdate={handleEventUpdate}
                            onEventAdd={({ done, event }) => {
                                return (
                                    <Modal
                                        portal={Portal}
                                        isVisible={true}
                                        onDismiss={() => {
                                            done()
                                            setTitle('')
                                        }}
                                        header={<Heading as="h3">Create New Event</Heading>}
                                        footer={
                                            <View
                                                row
                                                width="100%">
                                                <Button
                                                    onClick={() => {
                                                        done()
                                                        setTitle('')
                                                    }}>
                                                    Cancel
                                                </Button>
                                                <Flexer />
                                                <Button
                                                    onClick={() => {
                                                        setEvents([...events, { ...event, title, id: generateUEID() }])
                                                        setTitle('')
                                                        done()
                                                    }}
                                                    variant="accent"
                                                    outline>
                                                    Save
                                                </Button>
                                            </View>
                                        }>
                                        <Form
                                            column
                                            gap="1rem"
                                            onSubmit={() => {
                                                setEvents([...events, { ...event, title, id: generateUEID() }])
                                                setTitle('')
                                                done()
                                            }}
                                            width="100%">
                                            <Input
                                                autoFocus
                                                size="lg"
                                                placeholder="Enter event name"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </Form>
                                    </Modal>
                                )
                            }}>
                            {option == 0 && (
                                <ScheduleView
                                    days={daysDay}
                                    custom={customDay}
                                    date={date}
                                    events={events}
                                />
                            )}

                            {option == 1 && (
                                <ScheduleView
                                    days={days}
                                    custom={custom}
                                    date={date}
                                    events={events}
                                />
                            )}

                            {option == 2 && (
                                <MonthView
                                    date={date}
                                    events={events}
                                />
                            )}
                        </CalendarProvider>
                    </MenuProvider>
                </CommonProvider>
            </View>
        </>
    )
}

export const KanbanExample = () => {
    const [swimlanes, setSwimlanes] = useState<KanbanTypes.Swimlane[]>([data.swimlanes[0]])
    const [options, setOptions] = useState<RichInputOption[]>([])
    const [card, setCard] = useState<any>({})
    const [column, setColumn] = useState<any>({})
    const { setDialog, closeDialog } = useDialog()

    const handleCardMove = ({ origin, target }, selection: KanbanSelection[]) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardMove({ origin, target }, selection)
    }

    const handleColumnMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnMove({ origin, target })
    }

    const handleSwimlaneMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneMove({ origin, target })
    }

    const handleCardOpen = (card) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardOpen(card)
    }

    const handleCardAdd = ({ value, swimlaneIndex, columnIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardAdd({ value, swimlaneIndex, columnIndex })
    }

    const handleCardUpdate = (ca) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardUpdate(ca)
    }

    const handleCardDelete = (ca) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    row
                    width="100%"
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardDelete(ca)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleColumnAdd = ({ value, swimlaneIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnAdd({ value, swimlaneIndex })
    }

    const handleColumnUpdate = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnUpdate(col)
    }

    const handleColumnDelete = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnDelete(col)
    }

    const handleSwimlaneUpdate = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneUpdate(sl)
    }

    const handleSwimlaneDelete = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneDelete(sl)
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'kanban-label':
                return (
                    <LabelMenu
                        labels={payload.labels}
                        onCancel={dismiss}
                        onSave={(labels) => {
                            handleCardUpdate({ ...payload, labels })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-user':
                return (
                    <UserMenu
                        users={payload.users}
                        onCancel={dismiss}
                        onSave={(users) => {
                            handleCardUpdate({ ...payload, users })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-menu':
                return (
                    <ContextPopup
                        item={payload}
                        onCancel={dismiss}
                        onSave={(card) => {
                            dismiss()
                            handleCardUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setCard(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleCardDelete(payload)
                        }}
                    />
                )
            case 'kanban-column':
                return (
                    <GroupMenu
                        onEdit={(column) => {
                            setColumn({ ...column })
                            dismiss()
                        }}
                        onSave={(column) => {
                            handleColumnUpdate({ ...payload, ...column })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleColumnDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            case 'kanban-swimlane':
                return (
                    <GroupMenu
                        onEdit={(column) => {
                            // edit swimnlane
                            dismiss()
                        }}
                        onSave={(swimlane) => {
                            handleSwimlaneUpdate({ ...payload, ...swimlane })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSwimlaneDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            default:
                return null
        }
    }

    const handleTrigger = (word) => {
        if (word.trim().charAt(0) == '@') {
            setOptions(data.richInputUsers)
        } else if (word.trim().charAt(0) == '#') {
            setOptions(data.richInputLabels)
        } else {
            setOptions([])
        }
    }

    const handleWord = (word, next) => {
        if (word.includes('date:')) {
            next({
                phrase: word.trim(),
                type: word.split(':')[0],
                value: word.split(':')[1].trim(),
            })
        } else {
            next()
        }
    }

    return (
        <RichInputProvider
            triggers={['#', '@']}
            options={options}
            onWord={handleWord}
            onTrigger={handleTrigger}>
            <CommonProvider
                onUserFilter={(val) => null}
                onLabelFilter={(val) => null}
                availableLabels={data.availableLabels}
                availableUsers={data.availableUsers}
                colors={data.colorPalette}>
                <View
                    width="100%"
                    height={700}>
                    {!!card.id && (
                        <Detail
                            item={{ ...card }}
                            onCancel={() => setCard({})}
                            onSave={(card) => {
                                handleCardUpdate(card)
                                setCard({})
                            }}
                            onDelete={(card) => {
                                handleCardDelete(card)
                                setCard({})
                            }}
                        />
                    )}

                    {!!column.id && (
                        <GroupDetail
                            item={{ ...column }}
                            onCancel={() => {
                                setColumn({})
                            }}
                            onSave={(column) => {
                                handleColumnUpdate({ ...column })
                                setColumn({})
                            }}
                            onDelete={(column) => {
                                handleColumnDelete(column)
                                setColumn({})
                            }}
                        />
                    )}

                    <MenuProvider menu={getMenu}>
                        <KanbanProvider
                            id="kanban-instance-1"
                            addColumn={true}
                            defaultSelection={{}}
                            defaultInteraction="animated"
                            targetVariant={{ projects: 'focus' }}
                            card={undefined}
                            columnHeader={undefined}
                            swimlaneHeader={undefined}
                            onCardOpen={handleCardOpen}
                            onCardAdd={handleCardAdd}
                            onCardUpdate={handleCardUpdate}
                            onCardMove={handleCardMove}
                            onColumnAdd={handleColumnAdd}
                            onColumnMove={handleColumnMove}
                            onSwimlaneMove={handleSwimlaneMove}
                            onColumnUpdate={handleColumnUpdate}
                            onSwimlaneUpdate={handleSwimlaneUpdate}>
                            <Kanban
                                swimlanes={swimlanes}
                                toolbar={({ selection }) => {
                                    return (
                                        <View
                                            row
                                            position="fixed"
                                            bgToken="surface-inverse"
                                            colorToken="text-on-color"
                                            p="1rem 2rem"
                                            radius="var(--f-radius)"
                                            shadow="var(--f-shadow-xl)"
                                            zIndex={1000}
                                            gap={10}
                                            className="f-fadein"
                                            display={!Object.keys(selection).length ? 'none' : 'flex'}
                                            style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                                            <Text color="inherit">{Object.keys(selection).length} selected</Text>
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
                                                                <Button
                                                                    onClick={() => {
                                                                        closeDialog()
                                                                        dispatchKanbanEvent('select', {
                                                                            instanceId: 'kanban-instance-1',
                                                                        })
                                                                    }}>
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => {
                                                                        kanbanState({
                                                                            swimlanes,
                                                                            setSwimlanes,
                                                                            card,
                                                                            setCard,
                                                                        }).handleSelectionDelete(selection)
                                                                        dispatchKanbanEvent('select', {
                                                                            instanceId: 'kanban-instance-1',
                                                                        })
                                                                        closeDialog()
                                                                    }}>
                                                                    Delete
                                                                </Button>
                                                            </View>
                                                        ),
                                                    })
                                                }}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </KanbanProvider>
                    </MenuProvider>
                </View>
            </CommonProvider>
        </RichInputProvider>
    )
}

export const TodoExample = () => {
    const [sections, setSections] = useState<any>(data.sections)
    const [task, setTask] = useState<any>({})
    const [section, setSection] = useState<any>({})
    const [options, setOptions] = useState<RichInputOption[]>([])
    const { setDialog, closeDialog } = useDialog()

    const handleTaskOpen = (task) => {
        todoState({ task, setTask, sections, setSections }).handleTaskOpen(task)
    }

    const handleTaskUpdate = (taskData) => {
        todoState({ task, setTask, sections, setSections }).handleTaskUpdate(taskData)
    }

    const handleTaskDelete = (task) => {
        setDialog({
            title: 'Are you sure?',
            description: 'This action cannot be undone.',
            footer: (
                <View
                    row
                    width="100%"
                    justifyContent="space-between">
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={() => {
                            todoState({ task, setTask, sections, setSections }).handleTaskDelete(task)
                            closeDialog()
                        }}
                        variant="danger">
                        Delete
                    </Button>
                </View>
            ),
        })
    }

    const handleTaskAddBelow = ({ id, shouldIndent, task: { title, users, badges, labels } }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAddBelow({
            id,
            shouldIndent,
            task: { title, users, badges, labels },
        })
    }

    const handleTaskAdd = ({ task, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAdd({ task, sectionIndex })
    }

    const handleTaskMove = ({ origin, target, selection }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskMove({ origin, target, selection })
    }

    const handleSectionUpdate = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionUpdate(sec)
    }

    const handleSectionDelete = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionDelete(sec)
    }

    const handleSectionAdd = ({ name, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionAdd({ name, sectionIndex })
    }

    const handleSectionMove = ({ origin, target }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionMove({ origin, target })
    }

    const handleHtmlProcessing = (html) => {
        const { labels, users, title, to, from } = processHTML(html)
        return { labels, users, title, to, from }
    }

    const handleTrigger = (word) => {
        if (word.trim().charAt(0) == '@') {
            setOptions(data.richInputUsers)
        } else if (word.trim().charAt(0) == '#') {
            setOptions(data.richInputLabels)
        } else {
            setOptions([])
        }
    }

    const handleWord = (word, next) => {
        if (word.includes('date:')) {
            next({
                phrase: word.trim(),
                type: word.split(':')[0],
                value: word.split(':')[1].trim(),
            })
        } else {
            next()
        }
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'todo-menu':
                return (
                    <ContextPopup
                        isTodo
                        item={payload}
                        onCancel={dismiss}
                        onTodoAddBelow={() => {
                            dismiss()
                            dispatchTodoEvent('add-task-below', { id: payload.id })
                        }}
                        onTodoEdit={() => {
                            dismiss()
                            dispatchTodoEvent('edit-task', { id: payload.id })
                        }}
                        onSave={(card) => {
                            dismiss()
                            handleTaskUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setTask(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleTaskDelete(payload)
                        }}
                    />
                )
            case 'todo-section':
                return (
                    <GroupMenu
                        onEdit={(section) => {
                            setSection({ ...section })
                            dismiss()
                        }}
                        onSave={(section) => {
                            handleSectionUpdate({ ...payload, ...section })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSectionDelete(payload)
                            dismiss()
                        }}
                        group={payload}
                    />
                )
            default:
                return null
        }
    }

    return (
        <RichInputProvider
            triggers={['#', '@']}
            options={options}
            htmlProcessor={handleHtmlProcessing}
            onWord={handleWord}
            onTrigger={handleTrigger}>
            <CommonProvider
                onUserFilter={(val) => null}
                onLabelFilter={(val) => null}
                availableLabels={data.availableLabels}
                availableUsers={data.availableUsers}
                colors={data.colorPalette}>
                {!!task.id && (
                    <Detail
                        item={{ ...task }}
                        onCancel={() => {
                            setTask({})
                        }}
                        onSave={(task) => {
                            handleTaskUpdate(task)
                            setTask({})
                        }}
                        onDelete={(task) => {
                            handleTaskDelete(task)
                            setTask({})
                        }}
                    />
                )}

                {!!section.id && (
                    <GroupDetail
                        item={{ ...section }}
                        onCancel={() => {
                            setSection({})
                        }}
                        onSave={(section) => {
                            handleSectionUpdate({ ...section })
                            setSection({})
                        }}
                        onDelete={(section) => {
                            handleSectionDelete(section)
                            setSection({})
                        }}
                    />
                )}

                <MenuProvider menu={getMenu}>
                    <TodoProvider
                        id="todo-instance-1"
                        defaultSelection={{}}
                        defaultInteraction="animated"
                        targetVariant={{ projects: 'focus' }}
                        task={undefined}
                        sectionHeader={undefined}
                        onTaskOpen={handleTaskOpen}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskAdd={handleTaskAdd}
                        onTaskAddBelow={handleTaskAddBelow}
                        onTaskMove={handleTaskMove}
                        onSectionUpdate={handleSectionUpdate}
                        onSectionAdd={handleSectionAdd}
                        onSectionMove={handleSectionMove}>
                        <Todo
                            sections={sections}
                            toolbar={({ selection }) => {
                                return (
                                    <FloatingToolbar
                                        selection={selection}
                                        onDelete={() => {
                                            todoState({
                                                task,
                                                setTask,
                                                sections,
                                                setSections,
                                            }).handleSelectionDelete(selection)
                                            dispatchTodoEvent('select', {
                                                instanceId: 'todo-instance-1',
                                            })
                                            closeDialog()
                                        }}
                                    />
                                )
                            }}
                        />
                    </TodoProvider>
                </MenuProvider>
            </CommonProvider>
        </RichInputProvider>
    )
}

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
    const [option, setOption] = useState(0)

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
                    row
                    position="relative"
                    zIndex={0}
                    gap="0.75rem"
                    p="0.5rem 1.5rem 0.5rem 0.5rem">
                    <Options
                        position="sticky"
                        style={{ top: '1rem' }}
                        animated
                        zIndex={1000}
                        selected={option}
                        onOptionChange={setOption}>
                        <Option>Data Grid</Option>
                        <Option>Kanban Board</Option>
                        <Option>Todo List</Option>
                        <Option>Calendar</Option>
                    </Options>
                    <Flexer />
                    <Link
                        target="_blank"
                        href="/docs"
                        color="var(--f-color-accent)"
                        className="f-underline"
                        textDecoration="none">
                        Documentation ↗
                    </Link>
                </View>
                <View
                    p="0.5rem"
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
                        {option == 0 && (<DataGridExample />)}
                        {option == 1 && (<KanbanExample />)}
                        {option == 2 && (<TodoExample />)}
                        {option == 3 && (<CalendarExample />)}                        
                    </View>
                </View>
            </View>
        </View>
    )

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
