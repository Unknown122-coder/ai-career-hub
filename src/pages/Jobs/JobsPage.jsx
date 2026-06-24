import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { Button } from '../../components';
import { KANBAN_COLUMNS } from '../../constants';
import { generateId } from '../../utils';

const INITIAL_JOBS = {
  wishlist: [
    { id: 'j1', company: 'Google', role: 'Frontend Engineer', salary: '$180K', tags: ['React', 'Remote'], date: 'Jun 15' },
    { id: 'j2', company: 'Apple', role: 'UI Developer', salary: '$170K', tags: ['Swift', 'On-site'], date: 'Jun 18' },
  ],
  applied: [
    { id: 'j3', company: 'Stripe', role: 'Software Engineer', salary: '$190K', tags: ['Node.js', 'React'], date: 'Jun 10' },
    { id: 'j4', company: 'Vercel', role: 'Full Stack Dev', salary: '$160K', tags: ['Next.js'], date: 'Jun 12' },
  ],
  oa: [
    { id: 'j5', company: 'Meta', role: 'React Developer', salary: '$200K', tags: ['React', 'GraphQL'], date: 'Jun 8' },
  ],
  interview: [
    { id: 'j6', company: 'Netflix', role: 'Senior FE', salary: '$220K', tags: ['React', 'TypeScript'], date: 'Jun 5' },
  ],
  offer: [
    { id: 'j7', company: 'Shopify', role: 'Frontend Dev', salary: '$150K', tags: ['Vue.js'], date: 'Jun 1' },
  ],
  rejected: [
    { id: 'j8', company: 'Amazon', role: 'SDE', salary: '$175K', tags: ['Java', 'AWS'], date: 'May 25' },
  ],
};

export default function JobsPage() {
  const [columns, setColumns] = useState(INITIAL_JOBS);
  const [addingTo, setAddingTo] = useState(null);
  const [newJob, setNewJob] = useState({ company: '', role: '', salary: '' });

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;

      const sourceCol = [...columns[source.droppableId]];
      const destCol =
        source.droppableId === destination.droppableId
          ? sourceCol
          : [...columns[destination.droppableId]];

      const [moved] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, moved);

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      }));
    },
    [columns]
  );

  const addJob = useCallback(
    (columnId) => {
      if (!newJob.company || !newJob.role) return;

      const job = {
        id: generateId(),
        company: newJob.company,
        role: newJob.role,
        salary: newJob.salary || 'TBD',
        tags: [],
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };

      setColumns((prev) => ({
        ...prev,
        [columnId]: [...prev[columnId], job],
      }));
      setNewJob({ company: '', role: '', salary: '' });
      setAddingTo(null);
    },
    [newJob]
  );

  const deleteJob = useCallback((columnId, jobId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((j) => j.id !== jobId),
    }));
  }, []);

  return (
    <div className="kanban-page">
      <motion.div
        className="kanban-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="heading-3">Job Tracker</h2>
          <p className="text-muted text-small">Track your job applications across the pipeline</p>
        </div>
      </motion.div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {KANBAN_COLUMNS.map((col) => (
            <div className="kanban-column" key={col.id}>
              <div className="kanban-column-header">
                <div className="column-title">
                  <span className={`column-indicator ${col.color}`} />
                  <span>{col.title}</span>
                  <span className="column-count">{columns[col.id]?.length || 0}</span>
                </div>
                <button
                  className="column-add-btn"
                  onClick={() => setAddingTo(addingTo === col.id ? null : col.id)}
                  aria-label={`Add job to ${col.title}`}
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>

              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    className="kanban-column-body"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'rgba(99, 102, 241, 0.03)' : undefined,
                    }}
                  >
                    {/* Add card form */}
                    <AnimatePresence>
                      {addingTo === col.id && (
                        <motion.div
                          className="add-card-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <input
                            className="form-input"
                            placeholder="Company name"
                            value={newJob.company}
                            onChange={(e) => setNewJob((p) => ({ ...p, company: e.target.value }))}
                            autoFocus
                          />
                          <input
                            className="form-input"
                            placeholder="Job role"
                            value={newJob.role}
                            onChange={(e) => setNewJob((p) => ({ ...p, role: e.target.value }))}
                          />
                          <input
                            className="form-input"
                            placeholder="Salary (optional)"
                            value={newJob.salary}
                            onChange={(e) => setNewJob((p) => ({ ...p, salary: e.target.value }))}
                          />
                          <div className="add-card-actions">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => addJob(col.id)}
                            >
                              Add
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setAddingTo(null);
                                setNewJob({ company: '', role: '', salary: '' });
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {columns[col.id]?.map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className={`kanban-card ${snapshot.isDragging ? 'dragging' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="kanban-card-company">{job.company}</p>
                            <p className="kanban-card-title">{job.role}</p>
                            <div className="kanban-card-meta">
                              {job.tags.map((tag) => (
                                <span className="kanban-card-tag" key={tag}>{tag}</span>
                              ))}
                            </div>
                            <div className="kanban-card-footer">
                              <span className="salary">{job.salary}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="date">{job.date}</span>
                                <button
                                  onClick={() => deleteJob(col.id, job.id)}
                                  style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                                  aria-label={`Delete ${job.role} at ${job.company}`}
                                >
                                  <DeleteOutlineIcon style={{ fontSize: 16 }} />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
