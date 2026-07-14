import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faExpand,
  faTimes,
  faVideo,
  faPen,
  faFolderPlus,
  faCheck,
  faChevronDown,
  faChevronUp,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const STORAGE_KEY = "gd_design_sections";

const DEFAULT_SECTIONS = [
  {
    id: "section-parl-2025",
    title: "Parliament Election Campaign 2025",
    items: [],
  },
  {
    id: "section-local-2025",
    title: "Local Election 2025",
    items: [],
  },
];

const loadSections = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_SECTIONS;
};

const saveSections = (sections) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  } catch (e) {
    console.warn("LocalStorage quota exceeded — try removing some media.");
  }
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ─── GraphicDesign Component ────────────────────────────────────────────────
const GraphicDesign = () => {
  const [sections, setSections] = useState(loadSections);
  const [lightbox, setLightbox] = useState(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [addingSectionId, setAddingSectionId] = useState(null); // which section is adding files
  const [collapsed, setCollapsed] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [showNewSection, setShowNewSection] = useState(false);
  const fileRefs = useRef({});
  const newSectionRef = useRef(null);

  // Persist to localStorage on every change
  useEffect(() => {
    saveSections(sections);
  }, [sections]);

  // ── File Upload ──────────────────────────────────────────────────────────
  const handleFileChange = async (e, sectionId) => {
    const files = Array.from(e.target.files);
    const newItems = [];
    for (const file of files) {
      const base64 = await toBase64(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      newItems.push({
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        src: base64,
        type,
        title: file.name.replace(/\.[^/.]+$/, ""),
        desc: "",
      });
    }
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, ...newItems] } : s
      )
    );
    e.target.value = "";
    setAddingSectionId(null);
  };

  // ── Remove item ──────────────────────────────────────────────────────────
  const removeItem = (sectionId, itemId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s
      )
    );
    if (lightbox?.id === itemId) setLightbox(null);
  };

  // ── Update item fields ───────────────────────────────────────────────────
  const updateItem = (sectionId, itemId, field, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, [field]: value } : i
              ),
            }
          : s
      )
    );
  };

  // ── Section management ───────────────────────────────────────────────────
  const addSection = () => {
    const name = newSectionName.trim();
    if (!name) return;
    const newSec = {
      id: `section-${Date.now()}`,
      title: name,
      items: [],
    };
    setSections((prev) => [...prev, newSec]);
    setNewSectionName("");
    setShowNewSection(false);
  };

  const removeSection = (sectionId) => {
    if (
      window.confirm(
        "Remove this entire section and all its media? This cannot be undone."
      )
    ) {
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    }
  };

  const startEditSection = (sec) => {
    setEditingSectionId(sec.id);
    setEditingSectionTitle(sec.title);
  };

  const saveEditSection = () => {
    const name = editingSectionTitle.trim();
    if (!name) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === editingSectionId ? { ...s, title: name } : s
      )
    );
    setEditingSectionId(null);
  };

  const toggleCollapse = (sectionId) => {
    setCollapsed((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <section className="graphic-design" id="graphic-design">
      {/* Heading */}
      <h2 className="heading">
        Design <span>Experience</span>
      </h2>
      <p className="gd-subtitle">
        A curated showcase of my graphic design campaigns — browse by project.
      </p>

      {/* Add New Section Button */}
      <div className="gd-add-section-wrap">
        {showNewSection ? (
          <div className="gd-new-section-row">
            <input
              ref={newSectionRef}
              className="gd-new-section-input"
              placeholder="Section name (e.g. Brand Identity 2024)"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSection()}
              autoFocus
            />
            <button className="gd-done-btn" onClick={addSection}>
              <FontAwesomeIcon icon={faCheck} /> &nbsp;Create
            </button>
            <button
              className="gd-cancel-btn"
              onClick={() => {
                setShowNewSection(false);
                setNewSectionName("");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn gd-add-section-btn"
            onClick={() => setShowNewSection(true)}
          >
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;Add New Section
          </button>
        )}
      </div>

      {/* Sections */}
      {sections.map((sec) => (
        <div className="gd-section" key={sec.id}>
          {/* Section Header */}
          <div className="gd-section-header">
            <div className="gd-section-title-row">
              {editingSectionId === sec.id ? (
                <>
                  <input
                    className="gd-new-section-input"
                    value={editingSectionTitle}
                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEditSection()}
                    autoFocus
                  />
                  <button className="gd-done-btn" onClick={saveEditSection}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="gd-cancel-btn"
                    onClick={() => setEditingSectionId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="gd-section-title">{sec.title}</h3>
                  <span className="gd-section-count">
                    {sec.items.length} item{sec.items.length !== 1 ? "s" : ""}
                  </span>
                </>
              )}
            </div>
            <div className="gd-section-actions">
              {/* Upload to this section */}
              <button
                className="gd-action-btn gd-upload-to-btn"
                title="Upload to this section"
                onClick={() => {
                  setAddingSectionId(sec.id);
                  if (!fileRefs.current[sec.id]) return;
                  fileRefs.current[sec.id].click();
                }}
              >
                <FontAwesomeIcon icon={faUpload} /> &nbsp;Upload
              </button>
              <input
                ref={(el) => (fileRefs.current[sec.id] = el)}
                type="file"
                accept="image/*,video/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, sec.id)}
              />
              {/* Edit section name */}
              <button
                className="gd-action-btn"
                title="Rename section"
                onClick={() => startEditSection(sec)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              {/* Delete section */}
              <button
                className="gd-action-btn gd-delete"
                title="Remove section"
                onClick={() => removeSection(sec.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              {/* Collapse */}
              <button
                className="gd-action-btn gd-collapse-btn"
                title={collapsed[sec.id] ? "Expand" : "Collapse"}
                onClick={() => toggleCollapse(sec.id)}
              >
                <FontAwesomeIcon
                  icon={collapsed[sec.id] ? faChevronDown : faChevronUp}
                />
              </button>
            </div>
          </div>

          {/* Section Content */}
          {!collapsed[sec.id] && (
            <>
              {sec.items.length === 0 ? (
                <div
                  className="gd-empty"
                  onClick={() => fileRefs.current[sec.id]?.click()}
                >
                  <FontAwesomeIcon icon={faUpload} className="gd-empty-icon" />
                  <p>
                    Click <strong>Upload</strong> or tap here to add images &
                    videos to this section.
                  </p>
                  <p className="gd-empty-note">
                    Files are saved and persist across page refreshes.
                  </p>
                </div>
              ) : (
                <div className="gd-grid">
                  {sec.items.map((item) => (
                    <div className="gd-card" key={item.id}>
                      {/* Media */}
                      <div
                        className="gd-media-wrap"
                        onClick={() => setLightbox(item)}
                      >
                        {item.type === "video" ? (
                          <video
                            src={item.src}
                            className="gd-media"
                            muted
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="gd-media"
                          />
                        )}
                        <div className="gd-overlay">
                          <FontAwesomeIcon
                            icon={
                              item.type === "video" ? faVideo : faExpand
                            }
                            className="gd-overlay-icon"
                          />
                          <span>
                            {item.type === "video"
                              ? "Play Video"
                              : "View Full"}
                          </span>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="gd-card-info">
                        {editingItemId === item.id ? (
                          <>
                            <input
                              className="gd-edit-input"
                              value={item.title}
                              onChange={(e) =>
                                updateItem(
                                  sec.id,
                                  item.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Title"
                            />
                            <textarea
                              className="gd-edit-textarea"
                              value={item.desc}
                              onChange={(e) =>
                                updateItem(
                                  sec.id,
                                  item.id,
                                  "desc",
                                  e.target.value
                                )
                              }
                              placeholder="Short description..."
                              rows={2}
                            />
                            <button
                              className="gd-done-btn"
                              onClick={() => setEditingItemId(null)}
                            >
                              <FontAwesomeIcon icon={faCheck} /> &nbsp;Done
                            </button>
                          </>
                        ) : (
                          <>
                            <h4 className="gd-card-title">
                              {item.title || "Untitled"}
                            </h4>
                            {item.desc && (
                              <p className="gd-card-desc">{item.desc}</p>
                            )}
                            <div className="gd-card-actions">
                              <button
                                className="gd-action-btn"
                                onClick={() => setEditingItemId(item.id)}
                                title="Edit title & description"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button
                                className="gd-action-btn gd-delete"
                                onClick={() => removeItem(sec.id, item.id)}
                                title="Remove"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      {sections.length === 0 && (
        <div className="gd-empty">
          <p>No sections yet. Click <strong>Add New Section</strong> above to get started.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gd-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="gd-lightbox-close"
            onClick={() => setLightbox(null)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div
            className="gd-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "video" ? (
              <video
                src={lightbox.src}
                controls
                autoPlay
                className="gd-lightbox-media"
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="gd-lightbox-media"
              />
            )}
            {lightbox.title && (
              <p className="gd-lightbox-title">{lightbox.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesign;
